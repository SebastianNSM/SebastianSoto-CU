'use strict';
const express = require('express');
const router = express.Router();
const cursosApi = require('./curso.api');

router.route('/registrar_curso')
    .post(function (req, res) {
        cursosApi.registrar(req, res)
    });

router.route('/listar_curso')
    .get(function (req, res) {
        cursosApi.listar(req, res)
    });

router.route('/buscar_curso_id')
    .post(function (req, res) {
        cursosApi.buscar_curso_por_id(req, res);
    });

router.route('/modificar_curso')
    .post(function (req, res) {
        cursosApi.modificar_curso(req, res);
    });

router.route('/eliminar_curso')
    .post(function (req, res) {
        cursosApi.eliminar_curso(req, res);
    });

router.route('/periodo_activo')
    .post(function (req, res) {
        cursosApi.periodo_activo(req, res);
    });
module.exports = router;
