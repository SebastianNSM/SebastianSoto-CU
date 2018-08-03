'use strict';
const express = require('express');
const router = express.Router();
const carrerasApi = require('./carreras.api');

router.route('/registrar_carrera')
    .post(function (req, res) {
        carrerasApi.registrar_carrera(req, res);
    });

router.route('/listar_carrera')
    .get(function (req, res) {
        carrerasApi.listar_carrera(req, res);
    });

router.route('/agregar_curso_carrera')
    .post(function (req, res) {
        carrerasApi.agregar_curso_carrera(req, res);
    });

router.route('/buscar_carrera')
    .post(function (req, res) {
        carrerasApi.buscar_carrera(req, res);
    });

router.route('/modificar_carrera')
    .post(function (req, res) {
        carrerasApi.modificar_carrera(req, res);
    });

router.route('/eliminar_carrera')
    .post(function (req, res) {
        carrerasApi.eliminar_carrera(req, res);
    });

module.exports = router;