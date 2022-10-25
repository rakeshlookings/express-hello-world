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

const list = async({query}) => {
    let page = 0; limit = 10
    if (query.page && query.limit) {
        page = query.page;
        limit = query.limit
    }
    const items = await Ledger.find().skip(page * limit).limit(limit)
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
