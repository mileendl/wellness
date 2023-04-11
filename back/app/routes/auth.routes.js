var express = require("express");
var router = express.Router();
var passport = require('passport');
const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth.config");

function login(req, res, next) {
    console.log('a')
    passport.authenticate('login', async (err, user, info) => {
        console.log('b')
        console.log(user)
        try {
            if (err || !user) {
                // return next(info.msg);
                //Сообщаем клиенту об ошибке авторизации
                res.status(401).send(info);
                return null;
            }
            if (user == []) {
                res.status(400).send(info);
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

    })(req, res, next)
}

router.post('/register', passport.authorize('register', {
    session: false,
}), async (req, res, next) => login(req, res, next)
);

// router.post('/register', passport.authenticate('register', {
//     session: false,
//     failWithError: 400
// }),

// );


router.post('/login', async (req, res, next) => {
    login(req, res, next)
})

module.exports = router;