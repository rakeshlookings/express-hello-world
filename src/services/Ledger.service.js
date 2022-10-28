const Ledger = require('../models/Ledger.model')

const create = async({body}) => {
    const object =  new Ledger({
        amount:body.amount, category: body.category, seller:body.seller, reference: body.reference, date:body.date
    })
    const obj = await object.save()
    return {
        status: true,
        obj:obj
    }
}

const list = async({query}) => {
    let filter = {}
    if (query?.timespan === 'day') {
        let span = listByDaySpan()
        span = new Date.now().getMilliseconds()- span
        filter = {"date"  : {$gte : span}}
    }
    let page = 0; limit = 10
    if (query.page && query.limit) {
        page = query.page;
        limit = query.limit
    }
    let items = await Ledger.find(filter).skip(Number(page) * Number(limit)).limit(Number(limit))
    items = items.map(item => {
        const day = new Date(item.date).getFullYear() + ' ' + new Date(item.date).getMonth() + ' ' + new Date(item.date).getDate()
        return {
            amount: item.amount,
            seller: item.seller,
            day: day
        }
    })
    return {
        status:true,
        items: items
    }
}

const listByDaySpan = () => {
    const date = new Date();
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const span = ((hours * 3600) + (minutes * 60) + (seconds) ) * 1000
    return span
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
