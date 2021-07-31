const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use((req, res, callback) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    return res.status(200).json({})
  }
  callback()
})

require('./routes/api/routes')(app)

module.exports = app
