'use strict'
 let mongoose = require('mongoose')

 let sedeSchema = new mongoose.Schema({
     nombre_sede : {type : String, required : true, unique : true },
     dirExacta_sede : {type : String, required : true},
     latitud_sede : {type : String, required : true},
     longitud_sede : {type : String, required : true}
 })

module.exports = mongoose.model('Sede', sedeSchema);