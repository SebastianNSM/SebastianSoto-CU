'use strict';

let sedeModel = require('./sedes.model');

module.exports.registrar = function (req, res) {
    let nuevaSede = new sedeModel({
        nombre_sede: req.body.nombre_sede,
        dirExacta_sede: req.body.dirExacta_sede,
        latitud_sede: req.body.latitud_sede,
        longitud_sede: req.body.longitud_sede,
    });

    nuevaSede.save(function (error) {
        if (error) {
            res.json({
                succes: false,
                msj: 'La sede no pudo ser registrada: ' + error
            });

        } else {
            res.json({
                succes: true,
                msj: 'La sede ha sido registrada con éxito'
            });
        }
    });
};

module.exports.listar = function (req, res) {
    sedeModel.find().sort({ nombre_sede: 'asc' }).then(
        function (sedes) {
            res.send(sedes);
        });
};

module.exports.agregar_carrera_sede = function (req, res) {

    sedeModel.update(
        { _id: req.body._id },
        {
            $push:
            {
                'carreras_sede':
                {
                    nombre_carrera: req.body.nombre_carrera,
                    codigo_carrera: req.body.codigo_carrera
                }
            }
        },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo registrar la sede, ocurrió el siguiente error' + error });
            } else {
                res.json({ success: true, msg: 'La sede se registró con éxito' });
            }
        }
    )
};