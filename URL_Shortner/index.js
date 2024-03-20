import express from "express";
import connectDb from './db/index.js'
import dotenv from 'dotenv'
import Urlrouter from "./routes/url.route.js";
import { URL } from "./models/url.model.js";

dotenv.config({
    path: '/.env'
})

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
      res.send("working fine")
})

app.use('/api/v1/url', Urlrouter)
app.get('/:shortId', async (req, res) => {
 
       try {
         const shortId = req.params.shortId
         const entry = await URL.findOneAndUpdate({
             shortId
         }, {
             $push: {
                 visitHistory: {
                     timestamp : Date.now()
                 },
             },
         })
     
         res.redirect(entry.redirectURL)
       } catch (error) {
          
       }
    })


connectDb()

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})