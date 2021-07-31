const router = require('express').Router()
const btcService = require('../../services/btc')
const protectByAuth = require('../authChecker')

// Retrieve current BTC-UAH rate
router.get('/btcRate', protectByAuth, (req, res) => {
  btcService.getCurrentRate((err, currentRate) => {
    if (err) {
      return res.status(500).json({
        error: err
      })
    }
    res.json(currentRate)
  })
})

module.exports = router
