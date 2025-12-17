// Router of all users related operations and api call's

import { Router } from "express";
import { registerUser } from "../controllers/users.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// register user route

router.route("/register").post(upload.fields([
    {name: "avatar", maxCount: 1},
    {name: "coverImage", maxCount: 1}
]),registerUser);


export default router;