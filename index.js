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

//app to use cors when implementing fe
app.use(express.json())     //telling express to use json

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

app.delete('/all', (req, res) => {
    res.send("delete route")
    console.log("delete route")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})