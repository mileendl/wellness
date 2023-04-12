var express = require("express");
var router = express.Router();
var passport = require('passport');
const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth.config");

function authRespoonse(req, res, err, user, info) {
    try {
        // console.log(user)
        if (err || !user) {
            // return next(info.msg);
            //Сообщаем клиенту об ошибке авторизации
            res.status(info.status).send(info.msg);
            return null;
        }

        req.login(user, { session: false }, async (err) => {
            if (err) {
                // return next(err);
                throw err;
            }

            const body = user.username;
            const token = jwt.sign({ user: body }, authConfig.secret, { expiresIn: authConfig.expiration });

            //Здесь в json собираются все данные, которые надо передать клиенту после успешной авторизации
            return res.json({ auth: token, username: user.username });
        })
    } catch (err) {
        //Сообщаем об ошибке сервера - что-то сломалось
        res.status(500).send(err);
        // return next(err);
    }
}

router.post('/register', async (req, res, next) => {
    passport.authenticate('register', { session: false, },
        async (err, user, info) =>
            authRespoonse(req, res, err, user, info)
    )(req, res, next)
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', { session: false },
        async (err, user, info) =>
            authRespoonse(req, res, err, user, info)
    )(req, res, next)
})

module.exports = router;