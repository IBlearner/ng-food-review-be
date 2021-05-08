const express = require('express')
const app = express()
const cors = require("cors")
const port = 3000
require("dotenv").config()

//app to use cors when implementing fe
app.use(express.json())     //telling express to use json
app.use(cors())

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});
 
connection.connect((err) => {
    if (err) return console.log(`Error connecting: ${err.stack}`)
    console.log(`Connected as id ${connection.threadId}`)
});

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
    const { body } = req
    connection.query(`INSERT INTO data (item, location, imgURL, rating) VALUES ("${body.item}", "${body.location}", "${body.imgURL}", ${body.rating})`, (error, results, fields) => {
        if (error) {
            console.log(error.sqlMessage)
            return res.status(500).send(error.sqlMessage)
        }
        if (results.affectedRows === 1) {
            console.log(`Added "${body.item}"`)
            return res.sendStatus(200)
        }
    });
})

app.delete('/all', (req, res) => {
    const { id } = req.body
    connection.query(`DELETE FROM data WHERE id = ${id}`, (error, results, fields) => {
        if (error) {
            console.log(error.sqlMessage)
            return res.status(500).send(error.sqlMessage)
        }
        if (results.affectedRows === 1) {
            console.log(`Deleted item ${id}`)
            return res.sendStatus(200)
        }
    });
})

//considering using post instead as any field could be altered so might as well change that row anyway
app.patch('/all', (req, res) => {
    res.send("patch route")
    console.log("patch route")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})