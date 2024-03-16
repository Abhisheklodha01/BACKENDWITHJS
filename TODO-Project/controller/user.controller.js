import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { SendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/apiError.js";


export const RegisterUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler(400, "user already exists"))
    } else {
      const hashPassword = await bcryptjs.hash(password, 10);
      user = await User.create({
        name,
        email,
        password: hashPassword,
      });

      SendCookie(user, res, "Registered Successfully", 201);
    }
  } catch (error) {
    next(error)
  }
};

export const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler(400, "user does not exists"))
    } else {
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return next(new ErrorHandler(400, "Invalis password"))
      }

      SendCookie(user, res, `Welcome back ${user.name}`, 201);
    }
  } catch (error) {
    next(error)
  }
};

export const GetMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  })
};


export const Logout = (req, res) => {

  res.status(200)
    .cookie("token", "", {
      expiresIn: Date.now(),
      sameSite: process.env.NODE_ENV === "Dovelopment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Dovelopment" ? false : true
    })
    .json({
      success: true,
      message: " logout SuccessFully"
    })
}
