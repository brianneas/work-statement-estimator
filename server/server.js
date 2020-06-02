const sqlite3 = require('sqlite3')
const express = require('express')

const db = new sqlite3.Database("../workStatementDB.db")
console.log("Successfully opened the database.")

const app = express()

app.use(express.json())
app.use(express.static('../client'))

app.get('*', (req, res) => {
  res.status(404).end('Not Found.')
})

app.listen(8080)