var db = require('../config/db.config.js');
var User = db.user;
var globalFunctions = require('../config/global.functions.js');

// Получение всех пользователей

exports.findAll = (req, res) => {
    User.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};