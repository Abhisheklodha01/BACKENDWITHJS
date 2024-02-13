import express from "express"; // module js

const app = express();

// app.get('/', (req, res) => {
//     res.send('Server is ready')
// })

// get list of 5 jokes

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: "AS joke",
            content: "This is a joke"
        },
        {
            id: 2,
            title: "AS joke",
            content: "This is a another joke"
        },
        {
            id: 2,
            title: "AS joke",
            content: "This is a third joke"
        },
        {
            id: 4,
            title: "AS joke",
            content: "This is a fourth joke"
        },
        {
            id: 5,
            title: "AS joke",
            content: "This is a fifth joke"
        },
    ]
    res.send(jokes)
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`serve at ${port}`);
})
