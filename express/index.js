import express from "express";
import path from "path";
import dotenv from 'dotenv'
import mongoose, { Schema, mongo } from "mongoose";



const app = express()

dotenv.config({
    path:'./.env'
})

// database
 
await mongoose.connect(process.env.MONGO_URL).then(()=> (
    console.log("database connected")
)).catch((error) => console.log("error", error))

const messageSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true
    },

    email: {
        type: String,
        required: true
    }

}, {timestamps:true})

const Message = mongoose.model("Message", messageSchema)

const PORT = process.env.PORT


// setting up view engine
app.set("view engine", "ejs")

// serving html file 
// one way it will give error
// express.static(path.join(path.resolve(), 'public'))


// middlewares
app.use(express.static(path.join(path.resolve(), 'public')))
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
   
    res.render("index.ejs", {name: "Abhishek"})
    // res.sendFile("index")
})

app.get('/add', async (req, res) => {
     await Message.create({name: "abhi2", email:'sample2@gmail.com'})
     res.send("Data added successfully")
})

app.get('/success', (req, res) => {
    res.render("success")
})

app.get("/users", (req, res) => {
    res.json({
        success:true
    })
})

app.post("/contact", async (req, res) => {
     const {name, email} = req.body
     await Message.create({name, email})
     res.redirect('/success')
})


app.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
})









// app.get('/', (req, res)=> {
   
//     //    res methods

//     // res.sendStatus(400)
//     // res.send("hii")
//     // res.json({
//     //     success:true,
//     //     products: []
//     // })

//     // res.status(200).json({
//     //     success:true,
//     //     product: []
//     // })
// })


 // const location = path.resolve()
    // console.log(path.join(location, "/index.html"));
    // res.sendFile(path.join(location, "/index.html"))

    // sending html file 
