var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var authentication = require('./app/routes/auth_routes')

require('./app/auth/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('cors');
var corsOptions = {
    origin: '*', //Любое происхождение приемлимо
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200 // при успешной обработке запроса будет возвращён статус 200
};
app.use(cors(corsOptions));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({ force: false });

app.use('/', authentication)

var user = require('./app/routes/user.route.js');
user(app);

app.listen(3000);

console.log("server port 3000")