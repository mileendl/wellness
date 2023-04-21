var express = require("express");
var router = express.Router();
const db = require('../config/db.config');
const recordModel = require('../model/health_record_item.model');

router.post('/create_record', async (req, res, next) => {
    var record = req.data;
    
}); 

