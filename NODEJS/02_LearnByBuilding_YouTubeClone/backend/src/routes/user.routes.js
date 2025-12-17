// Router of all users related operations and api call's

import { Router } from "express";
import { registerUser } from "../controllers/users.controller.js";

const router = Router();

// register user route

router.route("/register").post(registerUser);


export default router;