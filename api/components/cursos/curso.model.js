'use strict';

let mongoose = require('mongoose');

let cursoSchema = new mongoose.Schema({

    nombre_curso : {type : String, required : true},
    codigo_curso : {type : String, unique : true, required : true},
    creditos_curso :{type : Number, required : true},
    costo_curso : {type : Number, required : true},
    requisitos_curso : {type : String, required : false}
});
module.exports = mongoose.model('Curso', cursoSchema);