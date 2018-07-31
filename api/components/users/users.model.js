'use strict';
let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    nombre_usuario: { type: String, required: true },
    primerapellido_usuario: { type: String, required: true },
    segundoapellido_usuario: { type: String, required: true },
    cedula_usuario: { type: Number, required: true },
    fecha_usuario: { type: String, required: true },
    correo_usuario: { type: String, required: true },
    telefono_usuario: { type: Number, required: true },
    direccion_usuario: { type: String, required: true },
    provincia_usuario:{ type: String, required: true }, 
    canton_usuario:{ type: String, required: true },
    distrito_usuario:{ type: String, required: true },
    rol_usuario:{ type: String, required: true },
    foto  : {type : String}
    
});
/*instruccoon para exportar datos a la base de daros en forma de esquema moongoose*/
module.exports = mongoose.model('User', userSchema)