import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { SendCookie } from "../utils/features.js";


export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
       res.status(400).json({
        success: false,
        message: "User already exists",
      });
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
     res.json({
      success: false,
      message: "something Went Wrong"
    })
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
       res.status(400).json({
        success: false,
        message: "user does not exists",
      });
    } else {
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }

      SendCookie(user, res, `Welcome back ${user.name}`, 201);
    }
  } catch (error) {
       res.json({
      success: false,
      message: "something Went Wrong"
    })
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
      expiresIn: Date.now()
    })
    .json({
      success: true,
      message: " logout SuccessFully"
    })
}
