const user = require('./user')
const btc = require('./btc')

module.exports = (app) => {
  app.use('/user', user)
  app.use(btc)

  app.use((req, res, callback) => {
    const err = new Error('Route not found')
    err.status = 404
    callback(err)
  })

  app.use((err, req, res, callback) => {
    res.status(err.status || 500)
    res.json({
      err: {
        message: err.message
      }
    })
  })
}
