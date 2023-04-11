var express = require("express");
var router = express.Router();
var passport = require('passport');

router.post('/register', passport.authenticate('register', {
    session: false,
    // successRedirect: '/',
    failureRedirect: '/register',
}),
    async (req, res, next) => {
        
        res.json({ msg: 'Registered successfully' })
    }
);

// router.get('/register')

module.exports = router;