require('dotenv').config()
const express = require('express') // both are same line 1 and 2
// import express from 'express'
const app = express()
const port = 4000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/instagram', (req, res) => {

    res.send('__abhishek_lodha_')
})

app.get('/login', (req, res) => {

    res.send("<h1>please login at chai aur code</h1>")

})

app.get('/youtube', (req, res) => {

    res.send('<h2>Chai aur Code</h2>')
})
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`)
})
