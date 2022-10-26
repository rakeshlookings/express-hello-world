const mongoose = require('mongoose')
const { Schema } = require('mongoose')


const ledgerSchema = new Schema({
    amount: {type:Number, require:true},
    category: String,
    seller:{type:String, require:true},
    reference:String,
    date:number
})

const Ledger = mongoose.model('Ledger', ledgerSchema)

module.exports = Ledger
