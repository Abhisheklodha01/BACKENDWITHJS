import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'


export const isAuthenticated = async (req, res, next) => {
   try {

      const { token } = req.cookies;
      if (!token) {
         res.status(400).json({
            success: false,
            message: "Please Login First",
         });
      }
      else {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const id = decoded._id;
         req.user = await User.findById(id);
         next()
      }

   } catch (error) {
      res.status(404).json({
         success: false,
         message: "something Went Wrong"
      })
   }
}