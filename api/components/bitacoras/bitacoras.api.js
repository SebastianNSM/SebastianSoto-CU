'use strict';

const bitacoraModel = require('./bitacoras.model');

module.exports.registrar_bitacora = function (req, res) {
    let nuevaBitacora = new bitacoraModel({
        cedula_bitacora : req.body.cedula_bitacora,
        nombre_bitacora : req.body.nombre_bitacora,
        curso_bitacora : req.body.curso_bitacora
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
    bitacoraModel.find().sort({ nombre_bitacora: 'asc' }).then(
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