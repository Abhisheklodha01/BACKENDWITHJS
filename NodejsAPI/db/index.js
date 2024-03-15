import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config({
    path:'./.env'
})


export const connectDB = async() => {
    try {
     await mongoose.connect(process.env.MONGO_URL)
     console.log("database connected")
    } catch (error) {
      console.log("db connection failed");
    }
     
 }