'use strict';

const cursoModel = require('./curso.model');
module.exports.registrar = function (req, res) {

    let nuevoCurso = new cursoModel({

        nombre_curso: req.body.nombre_curso,
        codigo_curso: req.body.codigo_curso,
        creditos_curso: req.body.creditos_curso,
        costo_curso: req.body.costo_curso
    })

    nuevoCurso.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el curso, ocurrió el siguiente error ' + error });
        } else {
            res.json({ success: true, msg: 'El curso se registró con éxito' });
        }
    });
};
module.exports.listar = function (req, res) {
    cursoModel.find().sort({ titulo: 'asc' }).then(
        function (cursos) {
            res.send(cursos);
        }
    );

};
module.exports.buscar_curso_por_id = function (req, res) {
    cursoModel.findById({ _id: req.body._id }).then(
        function (curso) {
            res.send(curso);
        });
};

module.exports.modificar_curso = function (req, res) {
    cursoModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El curso no se ha podido modificar. ' 
                + err });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};

module.exports.eliminar_curso = function (req, res) {
    cursoModel.findByIdAndDelete(req.body._id,
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El curso no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};

