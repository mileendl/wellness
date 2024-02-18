var express = require("express");
var router = express.Router();

const db = require('../config/db.config')

const recordModel = require('../model/health_record_item.model');
const indicatorModel = require('../model/health_indicator.model');

//Некоторые пути, не требующие авторизации

async function getDefaultData() {
    const tags = await db.tag.findAll();
    const indicators = await db.health_indicator.findAll();
    const programs = await db.training_program.findAll();
    const records = await db.health_record_item.findAll();
    var default_data = { tags: tags, health_indicators: indicators, training_programs: programs, records: records };
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

router.get('/get_health_indicators', (req, res, next) => {
    db.health_indicator.findAll().then((indicators) => {
        res.json(indicators);
    })
})

router.get('/get_health_indicator', (req, res, next) => {
    db.health_indicator.findByPk(req.query.id).then((indicator) => {
        res.json(indicator);
    })
})

module.exports = router;
