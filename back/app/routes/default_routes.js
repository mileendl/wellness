var express = require("express");
var router = express.Router();

const db = require('../config/db.config')

//Некоторые пути, не требующие авторизации

async function getDefaultData() {
    const tags = await db.tag.findAll();
    const indicators = await db.health_indicator.findAll();
    const programs = await db.training_program.findAll();
    var default_data = { tags: tags, health_indicators: indicators, training_programs: programs };
    return default_data;
}

router.get('/get_training_programs', (req, res, next) => {
    db.training_program.findAll().then((programs) => {
        res.json(programs);
    })
})

router.get('/get_training_program', (req, res, next) => {
    db.training_program.findByPk(req.query.id, { include: db.exercise }).then((program) => {
        res.json(program);
    })
})

router.get('/defaultdata', (req, res, next) => {
    getDefaultData().then(data => {
        res.json(data)
    });
})

module.exports = router;
