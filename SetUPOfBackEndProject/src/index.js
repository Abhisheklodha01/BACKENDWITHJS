// require ('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'


dotenv.config({
    path: './.env'
    
})

const port = process.env.PORT

connectDB().then(() => {
    app.listen(port, ()=> {
        console.log(`Server is running at port : ${port}`);
    })
}).catch((err)=> {
    console.log("MONGO DB CONNECTION FAILED");
})


// console.log("hii everyone");



// approach 1

/*
(async () => {
    try {

        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
    } catch (error) {
        console.error("ERROR: ", error)

    }
})()

*/