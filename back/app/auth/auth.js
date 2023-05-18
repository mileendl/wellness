const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('../config/db.config')
var bcrypt = require('bcrypt');
const { ExtractJwt } = require('passport-jwt');
var JWTStrategy = require('passport-jwt').Strategy
var secret = require('../config/auth.config').secret

//Регистрация пользователя
passport.use('register', new localStrategy(
    {
        passReqToCallback: true,
    },

    function (req, username, password, done,) {

        db.user.findOne({ where: { username: username } }).then(function (user) {

            if (user == null) {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return done(err);
                    }
                    user = { username: req.body.username, password: hash, name: req.body.name }
                    db.user.create(user)
                        .then(() => {
                            return done(null, user, 'Success');
                        }).catch((err) => {
                            console.log(err);
                            return done(err, null, { status: 500, msg: "Can't create user", });
                        })
                })
            } else {
                return done(null, false, { status: 400, msg: 'Such user already exists' });
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

    db.user.findOne({ where: { username: username } }).then((user) => {
        if (user == null) {
            done(null, false, { status: 404, msg: 'Wrong password or login' });
        } else {
            bcrypt.compare(password, user.password).then((isValid) => {
                if (isValid) {
                    return done(null, user, { msg: 'Logged in successfully' });
                } else {
                    return done(null, false, { status: 404, msg: 'Wrong password or login' });
                }
            })
        }
    }
    ).catch((err) => {
        done(err);
    })
}
))

//Аутентификация пользовтеля по JWT в заголовке
passport.use(new JWTStrategy(
    {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        try { return done(null, token.user); }
        catch (err) {
            console.log(err)
            done(err);
        }
    }
))