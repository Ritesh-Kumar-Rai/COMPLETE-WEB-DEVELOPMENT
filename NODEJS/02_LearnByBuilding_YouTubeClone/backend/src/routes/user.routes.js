// Router of all users related operations and api call's

import { Router } from "express";
import { changeUserPassword, getCurrentUser, loginUser, logoutUser, regenerateAccessRefreshToken, registerUser, updateUserAccountDetails, updateUserAvatarImage, updateUserCoverImage } from "../controllers/users.controller.js";
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
router.route("/change-current-password").post(verifyJWT, changeUserPassword);
router.route("/update-useraccount").post(verifyJWT, updateUserAccountDetails);
router.route("/update-useravatar").post(verifyJWT, upload.single("avatar"),updateUserAvatarImage);
router.route("/update-usercoverimage").post(verifyJWT, upload.single("coverImage"), updateUserCoverImage);


export default router;