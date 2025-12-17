// controller for users route

import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "User Registration API is working."
    })
});

export {registerUser};