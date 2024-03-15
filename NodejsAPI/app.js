import express from 'express'

import { connectDB } from './db/index.js'
import userRouter from './routes/user.route.js'


const app = express()

// middleware
app.use(express.json())
app.use("/users", userRouter)


connectDB()

app.get("/", (req, res) => {
    res.send("working fine")
})


export default app