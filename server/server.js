const sqlite3 = require('sqlite3')
const express = require('express')

const db = new sqlite3.Database("../workStatementDB.db")
console.log("Successfully opened the database.")

const app = express()

app.use(express.json())
app.use(express.static('../client'))

app.post('/change-query', (req, res) => {
  console.log(req.body)

  // db.run('INSERT INTO activity (user_id, name) VALUES (?, ?);', req.currentUserId, activity.name, err => {
  //   if (err) {
  //     if (err.code === 'SQLITE_CONSTRAINT') {
  //       res.status(400).end('Activity already exists in database.')
  //       return
  //     }
  //
  //     res.status(500).json({ message: 'Database error.', err })
  //     return
  //   }
  //
  //   res.end()
  // })

  res.end()
})

app.get('*', (req, res) => {
  res.status(404).end('Not Found.')
})

app.listen(8080)