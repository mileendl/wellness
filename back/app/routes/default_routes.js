var express = require("express");
var router = express.Router();

const db = require('../config/db.config')

//Некоторые пути, не требующие авторизации

router.get('/get_training_programs', (req, res, next) => {
    db.training_program.findAll().then((programs) => {
        res.json(programs);
    })
})

router.get('/defaultdata', (req, res, next) => {
    var default_data = {};
    db.health_indicator.findAll().then((indicators) => {
        console.log(indicators);
        default_data.indicators = indicators;
        // res.json(default_data);
        db.training_program.findAll().then((programs) => {
            default_data.training_programs = programs;
            res.json(default_data);
        })
    });
})

module.exports = router;
