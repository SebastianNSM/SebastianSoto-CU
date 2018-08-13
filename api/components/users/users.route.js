'use strict';
const express = require('express');
const router = express.Router();
const usersApi = require('./users.api');

router.route('/registrar_usuarios')
    .post(function (req, res) {
        usersApi.registrar_usuarios(req, res)
    });

router.route('/listar_usuarios')
    .get(function (req, res) {
        usersApi.listar_usuarios(req, res)
    });

router.route('/buscar_usuario_id')
    .post(function (req, res) {
        usersApi.buscar_usuario_por_id(req, res);
    });

    router.route('/buscar_masInfo_id')
    .post(function (req, res) {
        usersApi.buscar_masInfo_por_id(req, res);
    });

router.route('/modificar_usuario')
    .post(function (req, res) {
        usersApi.modificar_usuario(req, res);
    });

router.route('/eliminar_usuario')
    .post(function (req, res) {
        usersApi.eliminar_usuario(req, res);
    });
module.exports = router;