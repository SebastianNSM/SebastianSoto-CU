'use strict';
const express = require('express');
const router = express.Router();
const becasApi = require('./becas.api');

router.route('/registrar_beca')
    .post(function (req, res)
    {
        becasApi.registrar_beca(req, res);
    });

module.exports = router;