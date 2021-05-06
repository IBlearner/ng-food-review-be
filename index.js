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
 
connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

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