'use strict';
const express = require('express');
const router = express.Router();
const sedes = require('./sedes.api');

router.route('/registrar_sedes')
    .post(function(req, res) {
        sedes.registrar(req, res);
});

router.route('/listar_sedes')
    .get(function(req, res) {
        sedes.listar(req, res);
});

module.exports = router;