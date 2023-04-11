var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var authRoutes = require('./app/routes/auth.routes')
var eventRoutes = require('./app/routes/event.routes')

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
const passport = require('passport');

db.sequelize.sync({ force: false });

app.use('/', authRoutes);

app.use('/events', passport.authenticate('jwt', { session: false }), eventRoutes)

app.listen(3000);

console.log("server port 3000")