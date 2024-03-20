import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config({
   path: './.env'
})

const connectDB = async () => {
     try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected");
     } catch (error) {
        console.log("Database connection failed");
     }
}

export default connectDB