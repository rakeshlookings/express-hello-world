const Ledger = require('../models/Ledger.model')

const create = async({body}) => {
    const object =  new Ledger({
        amount:body.amount, category: body.category, seller:body.seller, reference: body.reference
    })
    const obj = await object.save()
    return {
        status: true,
        obj:obj
    }
}

const list = async() => {
    const items = await Ledger.find().lean()
    return {
        status:true,
        items: items
    }
}

const getOne = async({params}) => {
    const item = await Ledger.findOne({_id:params.id}).lean()
    return {
        status:true,
        items: item
    }
}

module.exports = {
   create,
   list,
   getOne
}
