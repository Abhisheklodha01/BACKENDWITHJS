import express from "express";
import {
  GetMyProfile,
  LoginUser,
  Logout,
  RegisterUser,
} from "../controller/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", RegisterUser);

router.post("/login", LoginUser);

router.get("/myprofile", isAuthenticated ,GetMyProfile);

router.get("/logout",  Logout)


export default router