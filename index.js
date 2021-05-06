const express = require('express')
const app = express()
const port = 3000

var mysql   = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Kienvi1996',
    database : 'food-review'
});
 
connection.connect((err) => {
    if (err) return console.log(`Error connecting: ${err.stack}`)
    console.log(`Connected as id ${connection.threadId}`)
});

//app uses cors here

app.get('/all', (req, res) => {
    connection.query("SELECT * FROM data", (error, results, fields) => {
        if (error) {
            console.log(error.sqlMessage)
            return res.status(500).send(error.sqlMessage)
        }
        res.status(200).send(results)
    });
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