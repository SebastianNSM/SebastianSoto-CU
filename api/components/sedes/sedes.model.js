'use strict'
let mongoose = require('mongoose')

let sedeSchema = new mongoose.Schema({
    nombre_sede: { type: String, required: true, unique: true },
    dirExacta_sede: { type: String, required: true },
    latitud_sede: { type: String, required: true },
    longitud_sede: { type: String, required: true },
    estado_sede: { type: String, required: true },
    carreras_sede: [
        {
            nombre_carrera: { type: String },
            codigo_carrera: { type: String }
        }
    ]
});

module.exports = mongoose.model('Sede', sedeSchema);