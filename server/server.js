const sqlite3 = require('sqlite3')
const express = require('express')

const db = new sqlite3.Database("../workStatementDB.db")
console.log("Successfully opened the database.")

const app = express()

app.use(express.json())
app.use(express.static('../client'))

app.post('/change-query', (req, res) => {
   const changeNumber = req.body.changeNumber
   console.log(changeNumber)

   const query =
      `SELECT part.partNumber, partType.partType, complexity.complexity
      FROM part
      INNER JOIN change ON part.changeId = change.changeId
      INNER JOIN partType ON part.partTypeId = partType.partTypeId
      INNER JOIN complexity ON part.complexityId = complexity.complexityId
      WHERE change.changeNumber = (?);`

   db.all(query, changeNumber, (err, rows) => {
      if (err) {
         res.status(500).json({ message: 'Database error.', err })
         return
      }

      res.json(rows)
   })

   // res.json({ 'changeNumber' : 'ELRE123' })


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
})

app.get('*', (req, res) => {
  res.status(404).end('Not Found.')
})

app.listen(8080)