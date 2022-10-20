const express = require('express')
const router = express.Router()
const ledgerRouter = require('./ledger')
console.log('index.router')
router.use('/ledger', ledgerRouter)

module.exports = router