'use strict';
let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    foto_usuario: { type: String},
    nombre_usuario: { type: String, required: true },
    primer_apellido_usuario: { type: String, required: true },
    segundo_apellido_usuario: { type: String, required: true },
    cedula_usuario: { type: Number, required: true },
    fecha_usuario: { type: String, required: true },
    correo_usuario: { type: String, required: true },
    telefono_usuario: { type: Number, required: true },
    direccion_usuario: { type: String, required: true },
    provincia_usuario:{ type: String, required: true }, 
    canton_usuario:{ type: String, required: true },
    distrito_usuario:{ type: String, required: true },
    rol_usuario:{ type: String, required: true },
    estado_usuario:{ type: String}, 
    contrasenna_usuario:{ type: String}
});
/*instruccoon para exportar datos a la base de daros en forma de esquema moongoose*/
module.exports = mongoose.model('User', userSchema)