'use strict';

const cursoModel = require('./curso.model');

module.exports.registrar = function(req, res) {
   
    let nuevoCurso = new cursoModel({
        
        nombre_curso : req.body.nombre_curso,
        codigo_curso : req.body.codigo_curso,
        creditos_curso : req.body.creditos_curso,
        costo_curso : req.body.costo_curso
    })

    nuevoCurso.save(function(error){
        if(error){
            res.json({success : false, msg: 'No se pudo registrar el curso, ocurrió el siguiente error ' + error});
        }else{
            res.json({success : true, msg: 'El libro se registró con éxito'}); 
        }
    });
};
module.exports.listar = function(req , res){
    cursoModel.find().sort({titulo: 'asc'}).then(
        function(cursos){
            res.send(cursos);
        }
    );

};