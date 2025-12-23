// Router of all users related operations and api call's

import { Router } from "express";
import { changeUserPassword, getCurrentUser, getUserChannelProfileDetails, getUserWatchHistory, loginUser, logoutUser, regenerateAccessRefreshToken, registerUser, updateUserAccountDetails, updateUserAvatarImage, updateUserCoverImage } from "../controllers/users.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// register user route

router.route("/register").post(upload.fields([
    {name: "avatar", maxCount: 1},
    {name: "coverImage", maxCount: 1}
]),registerUser);

// login route
router.route("/login").post(loginUser);

// logout route with middleware [secured/protected route ]
router.route("/logout").post(verifyJWT, logoutUser);

// route for access_and_refresh token rotation [re-creation]
router.route("/refresh-tokens").post(regenerateAccessRefreshToken);

// some user account management endpoints
router.route("/getuserdetails").get(verifyJWT, getCurrentUser);
router.route("/change-current-password").patch(verifyJWT, changeUserPassword);
router.route("/update-useraccount").patch(verifyJWT, updateUserAccountDetails);
router.route("/update-useravatar").patch(verifyJWT, upload.single("avatar"),updateUserAvatarImage);
router.route("/update-usercoverimage").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

// some user account activity endpoints
router.route("/getchanneldetails/:username").get(verifyJWT, getUserChannelProfileDetails);
router.route("/getwatchhistory").get(verifyJWT, getUserWatchHistory);


export default router;