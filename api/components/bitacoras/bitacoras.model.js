'use strict';

let mongoose = require('mongoose');

let bitacoraSchema = new mongoose.Schema({
    cedula_bitacora : {type: String, required: true},
    nombre_bitacora : {type: String, required: true},
    curso_bitacora : {type: String, required: true},
    horas_totales_bitacora : {type: Number},
    actividades_bitacora: [
        {
            fecha_registro_actividad : {type: Date},
            fecha_actividad_actividad : {type: Date},
            hora_inicio_actividad : {type: String },
            hora_fin_actividad : {type: String},
            horas_trabajadas_actividad : {type: Number},
            accion_actividad : {type: String},
            estudiantes_atendidos_actividad : {type: String},
            descripcion_actividad : {type: String}
        }
    ]
});

module.exports = mongoose.model('Bitacora', bitacoraSchema);