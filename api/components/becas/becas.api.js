'use strict';
const becaModel = require('./becas.model');

module.exports.registrar_beca = function (req, res)
{
    let nuevaBeca = new becaModel({
        max_horas: req.body.max_horas,
        max_beca: req.body.max_beca
    });
    nuevaBeca.save(function (error)
    {
        if (error) {
            res.json({
                success: false,
                msg: 'Esta información de beca no pudo ser registrada: ' + error
            });
        } else {
            res.json({
                success: true,
                msg: 'La información de beca ha sido registrada correctamente ' + error
            });
        }
    });
};
