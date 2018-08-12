'use strict';

const express = require('express');
const router = express.Router();
const bitacorasApi = require('./bitacoras.api');

router.route('/registrar_bitacora')
    .post(function (req, res) {
        bitacorasApi.registrar_bitacora(req, res);
    });

router.route('/listar_bitacora')
    .get(function (req, res) {
        bitacorasApi.listar_bitacora(req, res)
    });

router.route('/buscar_bitacora_id')
    .post(function (req, res) {
        bitacorasApi.buscar_bitacora_id(req, res);
    });

router.route('/modificar_bitacora')
    .post(function (req, res) {
        bitacorasApi.modificar_bitacora(req, res);
    });

router.route('/eliminar_bitacora')
    .post(function (req, res) {
        bitacorasApi.eliminar_bitacora(req, res);
    });
router.route('/agregar_actividad_carrera')
    .post(function (req, res) {
        bitacorasApi.agregar_actividad_carrera(req, res);
    });
router.route('/eliminar_subdocumento_actividad_id')
    .post(function (req, res) {
        bitacorasApi.eliminar_subdocumento_actividad_id(req, res);
    });


router.route('/modificar_bitacora')
    .post(function (req, res) {
        bitacorasApi.modificar_bitacora(req, res);
    });

module.exports = router;
