const express = require('express')
const ledgerRouter = express.Router()
const LedgerController = require('../controllers/Ledger.controller')

ledgerRouter.post('/', LedgerController.create)
ledgerRouter.get('/', LedgerController.list)
ledgerRouter.get('/:id', LedgerController.getOne)

module.exports = ledgerRouter