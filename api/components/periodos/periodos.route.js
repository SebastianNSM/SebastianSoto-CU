'use strict';
const express = require('express');
const router = express.Router();
const periodos = require('./periodos.api');

router.route('/registrar_periodo')
    .post(function(req, res){
    periodos.registrar_periodo(req, res);
});

router.route('/listar_periodos')
    .get(function(req, res) {
        periodos.listar(req, res);
});

router.route('/buscar_periodo_id')
    .post(function (req, res) {
        periodos.buscar_periodo_por_id(req, res);
    });

router.route('/modificar_periodo')
    .post(function (req, res) {
        periodos.modificar_periodo(req, res);
    });

router.route('/eliminar_periodo')
    .post(function (req, res) {
        periodos.eliminar_periodo(req, res);
    });

module.exports = router;