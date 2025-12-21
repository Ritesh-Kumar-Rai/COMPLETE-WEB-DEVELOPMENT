import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const verifyJWT = asyncHandler(async (req,_,next)=>{
    try {
        const accessToken_from_user = req?.cookies?.youtubeClone_access_token || req?.header("Authorization")?.replace("Bearer ", '');

        if(!accessToken_from_user){
            throw new ApiError(401, "Unauthorized Request!");
        }

        const decodedToken = jwt.verify(accessToken_from_user, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id)
        .select("-password -refreshToken -watchHistory");

        if(!user){
            throw new ApiError(401, "Invalid Access Token!");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, "Invalid User!", [error.name, error.message], error.stackTrace);
    }
});

export {verifyJWT};