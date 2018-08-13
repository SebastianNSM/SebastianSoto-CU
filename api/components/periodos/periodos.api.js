'use strict';

let periodoModel = require('./periodos.model');

module.exports.registrar_periodo = function (req, res) {
    let nuevoPeriodo = new periodoModel({
        nombre_periodo: req.body.nombre_periodo,
        estado_periodo: "Activo"
    });

    nuevoPeriodo.save(function (error) {
        if (error) {
            res.json({
                succes: false,
                msj: 'El periodo no pudo ser registrado: ' + error
            });

        } else {
            res.json({
                succes: true,
                msj: 'El periodo ha sido registrado con éxito'
            });
        }
    });
};
module.exports.listar = function (req, res) {
    periodoModel.find().sort({ nombre_periodo: 'asc' }).then(
        function (periodos) {
            res.send(periodos);
        });
};

module.exports.buscar_periodo_por_id = function (req, res) {
    periodoModel.findById({ _id: req.body._id }).then(
        function (periodo) {
            res.send(periodo);
        }
    );
};

module.exports.modificar_periodo = function (req, res) {
    periodoModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El periodo se ha podido modificar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};

module.exports.eliminar_periodo = function (req, res) {
    periodoModel.findByIdAndDelete(req.body._id,
        function (err, periodo) {
            if (err) {
                res.json({ success: false, msg: 'EL periodo no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};

