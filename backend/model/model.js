const mongoose = require('mongoose')

const modelDB = mongoose.Schema({
    name:String,
    lastname:String,
    age:Number
},{timestamps:true})

module.exports = mongoose.model('server7', modelDB)