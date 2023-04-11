const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../model/user.model');
const db = require('../config/db.config')
var bcrypt = require('bcrypt');


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
    }
)

)