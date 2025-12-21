// controller for users route

import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.models.js";
import { cookieOptions } from "../constants.js";
import jwt from "jsonwebtoken";


// Utility Function
const generateAccess_and_RefreshToken = async (user_id, user) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    return {accessToken, refreshToken};
};


// user related controller functions 
const registerUser = asyncHandler(async (req, res) => {
    const {fullName, username, email, password} = req.body;
    console.log(fullName, username, email, password)
    if([fullName, username, email, password].some(field => field?.trim() === '')){
        throw new ApiError(400, "All fields required!");
    }

    const isUserExisted = await User.findOne({
        $or : [{username}, {email}]
    });

    if(isUserExisted){
        throw new ApiError(409, "User with email or username already exists!");
    }

    const avatarImage = req?.files?.avatar[0];

    if(!avatarImage){
        throw new ApiError(400, "`avatar` field is required!");
    }

    let coverImagePath = '';

    if(req?.files && Array.isArray(req?.files?.coverImage) && req?.files?.coverImage?.length > 0){
        coverImagePath = req?.files?.coverImage[0]?.path || '';
    }

    const response = await User.create({
        fullName: fullName?.trim(),
        username: username.trim().toLowerCase(),
        email,
        password,
        avatar: avatarImage?.path,
        coverImage: coverImagePath
    });

    const Re_verifyUserRegistration = await User.findById(response._id, "-password -watchHistory -refreshToken -__v -_id");

    if(!Re_verifyUserRegistration){
        return res.status(500).json(new ApiError(500, "Oops! Something wrong happened while Registering user! Pardon for incovinience", Re_verifyUserRegistration));
    }

    return res.status(201).json(new ApiResponse(200, Re_verifyUserRegistration, "User Registered Successfully."));
});

// login user controller
const loginUser = asyncHandler(async (req,res) => {
    const {username, email, password} = req.body;

    if(!email && !username){
        throw new ApiError(400, "email or username is required for login!");
    }

    // or
    /*
    *   if(!(!email || !username)){
            throw new ApiError(400, "email or username is required for login!");
        }
    */
    
    if(!password){
        throw new ApiError(400, "It seem's like the `password` is missing or invalid! Kindly check before login");
    }

    const user = await User.findOne({
        $or: [{email}, {username}]
    });

    if(!user){
        throw new ApiError(401, "User not found! 😶");
    }
    
    const isValidUser = await user.isPasswordCorrect(password);
    
    if(!isValidUser){
        throw new ApiError(401, "Invalid Credentials! login failed😩");
    }

    const {accessToken, refreshToken} = await generateAccess_and_RefreshToken(user._id, user);

    if(!accessToken || !refreshToken){
        throw new ApiError(500, "Oops! Internal Server Error");
    }


    res.status(200)
    .cookie(process.env.COOKIE_ACCESS_TOKENNAME, accessToken, cookieOptions)
    .cookie(process.env.COOKIE_REFRESH_TOKENNAME, refreshToken, cookieOptions)
    .json(new ApiResponse(200, {
        username: user?.username,
        email: user?.email,
        apiTokens: {
            accessToken,
            refreshToken
        },
        message: "tokens generated successfully, loggedIn success"
    }, "User loggedIn Successfully. 🥳"));

});

const logoutUser = asyncHandler(async (req, res) => {
    try {
        const userId = req?.user?._id;
    
        await User.findByIdAndUpdate(userId, {
            // $unset: {
            //     refreshToken: 1
            // },
            $set: {
                refreshToken: undefined
            }
        }, {
            new: true
        });
    
        // or 
        /* 
            const updatedUser = await User.findById(userId);
            updatedUser?.refreshToken = undefined;
            updatedUser?.save({validateBeforeSave: false});
        */
    
        return res
        .status(200)
        .clearCookie(process.env.COOKIE_ACCESS_TOKENNAME, cookieOptions)
        .clearCookie(process.env.COOKIE_REFRESH_TOKENNAME, cookieOptions)
        .json(new ApiResponse(200,{},"User logged Out!"));

    } catch (error) {
        console.error(`${error.name} -> ${error.message}`);
        throw new ApiError(500, error.message || "Oops! Interval Server Error", [error.name, error.message], error.stack);
    }

});


// re-generate the refresh + access token when both/anyone expires or invalid by this below controller [Refresh Rotation Controller]
const regenerateAccessRefreshToken = asyncHandler(async (req, res)=>{
    const incomingRefreshToken = req?.cookies?.process.env.COOKIE_REFRESH_TOKENNAME || req?.body?.youtubeClone_refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized Request!");
    }

    try {
        
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if(!user){
            throw new ApiError(401, "Invalid Refresh Token");
        }

        if(incomingRefreshToken !== user?.refreshToken){
            // SECURITY_ACTION: Clear the refreshToken from DB..
            user?.refreshToken = undefined;
            await user?.save({validateBeforeSave: false});
            throw new ApiError(403, "Refresh token was reused! Please login again.");
        }

        const {accessToken, refreshToken: newRefreshToken} = await generateAccess_and_RefreshToken(_, user);

        return res.status(200)
        .cookie(process.env.COOKIE_ACCESS_TOKENNAME, accessToken, cookieOptions)
        .cookie(process.env.COOKIE_REFRESH_TOKENNAME, newRefreshToken, cookieOptions)
        .json(new ApiResponse(200, {
            accessToken,
            refreshToken: newRefreshToken
        }, "Tokens Refreshed Successfully."));



    } catch (error) {
        console.error(`${error.name} -> ${error.message}`);
        throw new ApiError(401, error.message || "Unauthorized Access because there's a invalid refresh token identified", [error.name, error.message], error.stack);
    }
});

export {registerUser, loginUser, logoutUser, regenerateAccessRefreshToken};


/*
* Steps of logic's:
 -----------------------------

 1. Register User:
            DB schema --> { username, email, password, fullName, watchHistory=[], avatar=img,coverImage=img, refreshToken, [default -> createdAt, updatedAt] }
    COLLECT THE BELOW field:
    VALIDATE EACH FIELD then
    a. username: 
        2 ways: 
            I. get username from user input
            II. auto-generate username by backend
            -> check is username is unique or not -> by quering to db
                            if yes then "continue" else "retry"
    b. email:
        Steps:
            I. get email from user
            II. verify is it exist in db or not (like if another user has created it's acc. via this email or not)
            III. if exists then "retry" else "continue"
    c. password:
        Steps:
            I. get password from user
            II. encrypt the password
            III. then continue
    d. watchHistory: by default [] empty array
    e. avatar: mandatory will get from user then validate then store it to server file using multer
    f. coverImage: optional will get from the user if yes then validate and store file in storage
    g. refreshToken: auto generated by backend server

    STORE IT TO DB:
    then we will store all this field's to MONGODB database by create entry
    - remove password and accesstoken from response of mongodb
    - check for user creation
    - return response to user

 2. Login User:
        DB Schema --> { refer register model}
        VALIDATE EACH FIELD
        a. get email or username
        b. get password
        c. generate refresh token & access token
        d. store refresh token to db
        e. send access token to client/user via cookie
        f. send response back to client/user 
*/