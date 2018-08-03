'use strict';
const carreraModel = require('./carreras.model');

module.exports.registrar_carrera = function (req, res) {
    let nuevaCarrera = new carreraModel({
        nombre_carrera: req.body.nombre_carrera,
        grado_carrera: req.body.grado_carrera,
        codigo_carrera: req.body.codigo_carrera,
        creditos_carrera: req.body.creditos_carrera,
        fecha_carrera: req.body.fecha_carrera,
        estado_carrera: "Activo"
    });
    nuevaCarrera.save(function (error) {
        if (error) {
            res.json({
                success: false,
                msg: 'La carrera no pudo ser registrada: ' + error
            });
        } else {
            res.json({
                success: true,
                msg: 'La carrera ha sido registrada correctamente ' + error
            });
        }
    });
};

module.exports.listar_carrera = function (req, res) {
    carreraModel.find().sort({ nombre_carrera: 'asc' }).then(
        function (carreras, error) {
            if (error) {
               
                res.json({ success: false, msg: 'No se pudo registrar la sede, ocurrió el siguiente error' + error });
            } else {
                
                res.send(carreras);

            }
        }
       
    );
};
module.exports.agregar_curso_carrera = function (req, res) {

    carreraModel.update(
        { _id: req.body._id },
        {
            $push:
            {
                'cursos_carrera':
                {
                    nombre_curso: req.body.nombre_curso,
                    codigo_curso: req.body.codigo_curso
                }
            }
        },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo registrar el curso, ocurrió el siguiente error' + error });
            } else {
               res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        }
    )
};

module.exports.buscar_carrera = function (req, res) {
    carreraModel.findById({ _id: req.body._id }).then(
        function (carrera) {
            res.send(carrera);
        }
    );
};
module.exports.modificar_carrera = function (req, res) {
    carreraModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'La carrera no se ha podido modificar. ' + err });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};

module.exports.eliminar_carrera = function (req, res) {
    carreraModel.findByIdAndDelete(req.body._id,
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'La carrera no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};