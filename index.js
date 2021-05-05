const express = require('express')
const app = express()
const port = 3000

//app uses cors here

app.get('/all', (req, res) => {
    res.send("get route")
    console.log("get route")
})

app.post('/all', (req, res) => {
    res.send("post route")
    console.log("post route")
})

app.patch('/all', (req, res) => {
    res.send("patch route")
    console.log("patch route")
})

app.delete('/all', (req, res) => {
    res.send("delete route")
    console.log("delete route")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})