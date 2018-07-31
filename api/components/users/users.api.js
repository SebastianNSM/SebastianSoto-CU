'use strict';
const usersModel = require('./users.model');

module.exports.registrar_usuarios = function (req, res)
{

    let nuevoUsuario = new usersModel({
        nombre_usuario: req.body.nombre_usuario,
        primerapellido_usuario: req.body.primerapellido_usuario,
        segundoapellido_usuario: req.body.segundoapellido_usuario,
        cedula_usuario: req.body.cedula_usuario,
        fecha_usuario: req.body.fecha_usuario,
        correo_usuario: req.body.correo_usuario,
        telefono_usuario: req.body.telefono_usuario,
        direccion_usuario: req.body.direccion_usuario,
        provincia_usuario: req.body.provincia_usuario,
        canton_usuario: req.body.canton_usuario,
        distrito_usuario: req.body.distrito_usuario,
        rol_usuario: req.body.rol_usuario,
        foto: req.body.foto
    });

    nuevoUsuario.save(function (error)
    {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar su usuario, ocurrio el siguiente error ' + error });
        } else {
            res.json({ success: true, msg: 'usted se ha registro con exito' })
        }

    });
};
module.exports.listar_usuarios = function (req ,res)
{
    usersModel.find().sort({ nombre_usuario: 'asc' }).then(
        function (usuarios)
        {
            res.send(usuarios);
        }
    );

};

module.exports.buscar_usuario = function (req, res) {
    usersModel.findById({ _id: req.body._id }).then(
        function (usuario) {
            res.send(usuario);
        }
    );
};

module.exports.modificar_usuario = function (req, res) {
    usersModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'El usuario no se ha podido modificar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};

module.exports.eliminar_usuario = function (req, res) {
    usersModel.findByIdAndDelete(req.body._id,
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'El usuario no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};
