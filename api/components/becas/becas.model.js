'use strict';

let mongoose = require('mongoose');

let becaSchema = new mongoose.Schema({
    max_horas: { type: Number, required: true },
    max_beca: { type: Number, required: true }
});

module.exports = mongoose.model('Beca', becaSchema);