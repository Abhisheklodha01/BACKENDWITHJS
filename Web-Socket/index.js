import exp from 'constants'
import express from 'express'
import http from 'http'
import path from 'path'
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app)
// web socket
const io = new Server(server)

io.on('connection', (socket)=> {
    socket.on("user_message", (message) => {
        // console.log("A new Message : ", message);
        io.emit('message', message)
    })
})



app.use(express.static(path.resolve("./public")))

app.get("/", (req, res)=> {
    return res.sendFile('./public/index.html')
})

const port = 7000

server.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
})