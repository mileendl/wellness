var express = require("express");
var router = express.Router();

//Файл для запросов, связанных с событиями

//Путь для тестирования авторизации, но может быть использован потом для нормальных целей
router.get('/all_events',
    (req, res, next) => {
        res.json({ msg: 'all_events reached successfully' });
    }
)

module.exports = router;