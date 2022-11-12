const Ledger = require('../models/Ledger.model')

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

const create = async ({ body }) => {
    const object = new Ledger({
        amount: body.amount, category: body.category, seller: body.seller, reference: body.reference, date: new Date()
    })
    const obj = await object.save()
    return {
        status: true,
        obj: obj
    }
}

const list = async ({ query }) => {
    let filter = {}
    let span = 0
    let page = 0; limit = 10
    if (query?.timespan === 'day') {
        span = listByDaySpan()
    }
    if (query?.timespan === 'week') {
        span = listByWeekSpan()
    }
    if (query?.timespan === 'month') {
        span = listByMonthSpan()
    }
    if (query?.timespan === 'custom' && query.start && query.end){
        filter = {
            $and: [{ "date": { $gt: query.start } }, { "date" : { $lte: query.end } }]
          }
    } else {
        filter.date = { $gte: span }
    }
    
    if (query.page && query.limit) {
        page = query.page;
        limit = query.limit
    }
    if (query?.category){
        filter.category = category
    }
    if (query?.search){
        filter.seller =  { $regex: query?.search, $options: "i" }
    }
    let items = await Ledger.find(filter).skip(Number(page) * Number(limit)).limit(Number(limit))
    items = items.map(item => {
        let day = new Date(item.date) 
        day = `${day.getDate()}-${months[day.getMonth()]}-${day.getFullYear()}`
        return {
            amount: item.amount,
            seller: item.seller,
            day: day,
            category: item.category,
            reference: item.reference
        }
    })
    const sum = await Ledger.aggregate([
        { $match: filter },
        { $group: { _id: null, amount: { $sum: "$amount" } } }
    ])
    return {
        status: true,
        sum:sum,
        items: items
    }
}

const listByDaySpan = () => {
    const date = new Date();
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const span = ((hours * 3600) + (minutes * 60) + (seconds) ) * 1000
    return (date - span)
}

const listByWeekSpan = () => {
    const date = new Date();
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const day = date.getDay()
    const span = ((day * 24 * 3600) + (hours * 3600) + (minutes * 60) + (seconds) )* 1000 
    return (date - span)
}

const listByMonthSpan = () => {
    const date = new Date();
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const monthDate = date.getDate()
    const span = ((monthDate * 24 * 3600) + (hours * 3600) + (minutes * 60) + (seconds) )* 1000 
    return (date - span)
}

const getOne = async ({ params }) => {
    const item = await Ledger.findOne({ _id: params.id }).lean()
    return {
        status: true,
        items: item
    }
}

module.exports = {
    create,
    list,
    getOne
}
