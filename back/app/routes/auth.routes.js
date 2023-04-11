var express = require("express");
var router = express.Router();
var passport = require('passport');
const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth.config");

router.post('/register', passport.authenticate('register', {
    session: false,
    // successRedirect: '/',
    // failureRedirect: '/register',
}),
    async (req, res, next) => {

        res.json({ msg: 'Registered successfully' })
    }
);

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                console.log(err);
                return next(err);
            }

            req.login(user, { session: false }, async (err) => {
                if (err) {
                    return next(err);
                }

                const body = user.username;
                const token = jwt.sign({ user: body }, authConfig.secret, { expiresIn: authConfig.expiration });

                return res.json({ auth: token });
            }
            )
        } catch (err) {
            return next(err);
        }


        //TODO or not?
    })(req, res, next)
})



// router.get('/register')

module.exports = router;