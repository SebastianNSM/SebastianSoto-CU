'use strict'
 let mongoose = require('mongoose')

 let periodoSchema = new mongoose.Schema({
     nombre_periodo : {type : String, required : true, unique : true },
     estado_periodo : {type: String, required : true,},
 })

module.exports = mongoose.model('Periodo', periodoSchema);