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

module.exports = router;
