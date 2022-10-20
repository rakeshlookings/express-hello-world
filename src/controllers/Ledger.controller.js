const LedgerService = require('../services/Ledger.service')
const validate = (body) => {
    let message = "Please provide adequate Information"

    if (!body?.amount || !body?.seller?.length || !body?.category?.length) {
       if (!body?.amount) {
        message = message + ' amount is missing'
       }
       if (!body?.seller?.length) {
        message = message + ' seller is missing'
       }
       if (!body?.category?.length) {
        message = message + ' category is missing'
       }
       throw new Error(message)
    }
}
const create = async(req,res) => {
    try {
        validate(req.body)
        const response = await LedgerService.create(req)
        return res.status(201).json(response)
    } catch(err) {
        return res.status(400).json({
            message:err.message
        })
    }
}

const list = async(req,res) => {
    try {
        const response = await LedgerService.list(req)
        return res.status(200).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}

const getOne = async(req,res) => {
    try {
        const response = await LedgerService.getOne(req)
        return res.status(200).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}



module.exports = {
   create,
   list,
   getOne
}
