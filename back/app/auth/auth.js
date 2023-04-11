const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../model/user.model');
const db = require('../config/db.config')
var bcrypt = require('bcrypt');
const { ExtractJwt } = require('passport-jwt');
var JWTStrategy = require('passport-jwt').Strategy
var secret = require('../config/auth.config').secret

//Регистрация пользователя
passport.use('register', new localStrategy(
    {
        // usernameField: 'username',
        // passwordField: 'password',
        passReqToCallback: true
    },

    function (req, username, password, done) {

        db.user.findAll({ where: { username: username } }).then(function (user) {

            if (user != null) {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return done(err);
                    }

                    db.user.create({ username: req.body.username, password: hash, email: req.body.email, name: req.body.name })
                        .then(() => {
                            return done(null, 'Success');
                        }).catch((err) => {
                            // console.log(err)
                            return done(err);
                        })
                })

            } else {
                return done(null, false, req.msg('Such user already exists'));
            }
        }).catch(err => {
            return done(err);
        })
    })
)

//Вход в учетную запись
passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    try {
        db.user.findOne({ where: { username: username } }).then((user) => {
            if (user == null) {
                done(null, false, { msg: 'Wrong password or login' });
            } else {
                bcrypt.compare(password, user.password).then((isValid) => {
                    if (isValid) {
                        return done(null, user, { msg: 'Logged in successfully' });
                    }
                    return done(null, false, { msg: 'Wrong password or login' });
                })
            }
        }
        ).catch((err) => {
            done(err);
        })
    }
    catch (err) {

    }
}
))

//Аутентификация пользовтеля по JWT в заголовке
passport.use(new JWTStrategy(
    {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        console.log('TOKEN')
        console.log(token)
        try { return done(null, token.user); }
        catch (err) {
            done(err);
        }
    }
))