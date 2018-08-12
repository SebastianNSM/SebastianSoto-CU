'use strict';

const bitacoraModel = require('./bitacoras.model');

module.exports.registrar_bitacora = function (req, res) {
    let nuevaBitacora = new bitacoraModel({
        nombre_profesor_bitacora: req.body.nombre_profesor_bitacora,
        nombre_asistente_bitacora: req.body.nombre_asistente_bitacora,
        curso_bitacora: req.body.curso_bitacora,
        estado_bitacora: "En revisión"
    })

    nuevaBitacora.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar la bitácora, ocurrió el siguiente error' + error });
        } else {
            res.json({ success: true, msg: 'La bitácora se registró con éxito' });
        }
    });
};

module.exports.listar_bitacora = function (req, res) {
    bitacoraModel.find().sort({ nombre_profesor_bitacora: 'asc' }).then(
        function (bitacoras) {
            res.send(bitacoras);
        }
    );
};
module.exports.buscar_bitacora_id = function (req, res) {
    bitacoraModel.findById({ _id: req.body._id }).then(
        function (bitacora) {
            res.send(bitacora);
        }
    );
};

module.exports.eliminar_bitacora = function (req, res) {
    bitacoraModel.findByIdAndDelete(req.body._id,
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'La bitacora no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};

module.exports.agregar_actividad_bitacora = function (req, res) {

    bitacoraModel.update(
        { _id: req.body._id },
        {
            $push:
            {
                'actividades_bitacora':
                {
                    fecha_registro_actividad: req.body.fecha_registro_actividad,
                    fecha_actividad_actividad: req.body.fecha_actividad_actividad,
                    hora_inicio_actividad: req.body.hora_inicio_actividad,
                    hora_fin_actividad: req.body.hora_fin_actividad,
                    horas_trabajadas_actividad: req.body.horas_trabajadas_actividad,
                    accion_actividad: req.body.accion_actividad,
                    estudiantes_atendidos_actividad: req.body.estudiantes_atendidos_actividad,
                    descripcion_actividad: req.body.descripcion_actividad
                }
            }
        },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo registrar la actividad, ocurrió el siguiente error' + error });
            } else {
                res.json({ success: true, msg: 'Se ha registrado la actividad correctamente. ' + res });
            }
        }
    )
};
module.exports.eliminar_subdocumento_actividad_id = function (req, res) {

    bitacoraModel.update(
        { _id: req.body._id },
        {
            $pull:
            {
                'actividades_bitacora':
                {
                    _id: req.body.id_actividad
                }
            }
        },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo eliminar la actividad, ocurrió el siguiente error' + error });
            } else {
                res.json({ success: true, msg: 'Se ha eliminado la actividad correctamente. ' + res });
            }
        }
    )
};

// modificar_bitacora
module.exports.modificar_bitacora = function (req, res) {
    bitacoraModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'La bitácora no se ha podido modificar. ' + err });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};