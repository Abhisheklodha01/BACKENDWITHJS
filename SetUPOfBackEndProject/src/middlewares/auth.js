import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken"


export const verifyJWT = asynchandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log(token);

        if (!token) {
            throw new apiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new apiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    }
    catch (error) {
        throw new apiError(401, error?.message || "Invalid access Token")
    }
})