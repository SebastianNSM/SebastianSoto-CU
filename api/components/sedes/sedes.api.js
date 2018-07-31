'use strict';

let sedeModel = require('./sedes.model');

module.exports.registrar = function(req, res){
    let nuevaSede = new sedeModel({
        nombre_sede : req.body.nombre_sede,
        dirExacta_sede : req.body.dirExacta_sede,
        latitud_sede : req.body.latitud_sede,
        longitud_sede : req.body.longitud_sede,
    });

    nuevaSede.save(function(error){
        if (error){
            res.json({
                succes: false,
                msj: 'La sede no pudo ser registrada: ' + error
            });
        
        }else{
            res.json({
                succes: true,
                msj: 'La sede ha sido registrada con éxito'
            });
        }    
    });
};

module.exports.listar = function(req, res){
    sedeModel.find().sort({nombre_sede: 'asc'}).then(
        function(sedes){
            res.send(sedes);
        });
};