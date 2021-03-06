'use strict';
let mongoose = require('mongoose');

let carreraSchema = new mongoose.Schema({
    nombre_carrera: { type: String, required: true },
    grado_carrera: { type: String, required: true },
    codigo_carrera: { type: String, unique: true, required: true },
    creditos_carrera: { type: Number, required: true },
    fecha_carrera: { type: Date, required: true },
    cursos_carrera: [
        {
            nombre_curso: { type: String },
            codigo_curso: { type: String }
        }
    ],
    estado_carrera: { type: String, required: true }
});

module.exports = mongoose.model('Carrera', carreraSchema);
