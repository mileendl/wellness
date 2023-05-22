var express = require("express");
var router = express.Router();
const db = require('../config/db.config');
const recordModel = require('../model/health_record_item.model');
const indicatorModel = require('../model/health_indicator.model');

router.post('/create_record', async (req, res, next) => {
    var record = req.data;
    console.log(record);
    res.send(record)
}); 

router.get('/get_health_records', (req, res, next) => {
    db.health_record_item.findAll().then((records) => {
        res.json(records);
    })
})

router.get('/get_health_indicators', (req, res, next) => {
    db.health_indicator.findAll().then((indicators) => {
        res.json(indicators);
    })
})
