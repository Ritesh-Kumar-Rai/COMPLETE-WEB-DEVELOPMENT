// Router of all users related operations and api call's

import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/users.controller.js";
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


export default router;