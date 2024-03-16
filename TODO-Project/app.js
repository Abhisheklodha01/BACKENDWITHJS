import express from 'express'
import { connectDB } from './db/index.js'
import userRouter from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import taskRouter from './routes/task.route.js'
import { ApiError } from './middlewares/apiError.js'
import cors from 'cors'


const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)


connectDB()

app.get("/", (req, res) => {
    res.send("working fine")
})
// using error middleware
app.use(ApiError)

export default app