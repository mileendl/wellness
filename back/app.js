var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var authRoutes = require('./app/routes/auth.routes')
var eventRoutes = require('./app/routes/event_records.routes')
var defaultRoutes = require('./app/routes/default_routes')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('cors');
var corsOptions = {
    origin: ' http://localhost:8080',
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200 // при успешной обработке запроса будет возвращён статус 200
};
app.use(cors(corsOptions));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных
const passport = require('passport');

db.sequelize.sync({ force: false });

require('./app/auth/auth');
app.use('/auth', authRoutes);

app.use('/events', passport.authenticate('jwt', { session: false }), eventRoutes);

app.use('/default', defaultRoutes);

// console.log(__dirname + '/resources');
//Для доступа к изображениям
app.use(express.static(__dirname + '/resources'))

app.listen(3000);

console.log("server port 3000")

