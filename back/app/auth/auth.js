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
        passReqToCallback: true,
    },

    function (req, username, password, done,) {

        console.log('Lora')
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

    console.log('Nevil')
    db.user.findOne({ where: { username: username } }).then((user) => {
        console.log('Irma')
        if (user == null) {
            console.log('Olek')
            done(null, false, { status: 401, msg: 'Wrong password or login' });
        } else {
            console.log('Martin')
            bcrypt.compare(password, user.password).then((isValid) => {
                if (isValid) {
                    console.log('Patrick')
                    return done(null, user, { msg: 'Logged in successfully' });
                } else {
                    console.log('Peter')
                    return done(null, false, { status: 401, msg: 'Wrong password or login' });
                }
            })
        }
    }
    ).catch((err) => {
        console.log('harry')
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
        console.log('TOKEN')
        try { return done(null, token.user); }
        catch (err) {
            console.log(err)
            done(err);
        }
    }
))