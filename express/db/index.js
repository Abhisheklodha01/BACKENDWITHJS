import mongoose from "mongoose"
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


const userSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true
    },

    email: {
        type: String,
        required: true
    },
    
    password: {
        type:String,
        required:true
    },

}, {timestamps:true})

export const User = mongoose.model("User", userSchema)