const express = require('express')
const passport = require('passport')
const User = require('../models/User')
const router = express.Router()

router.get('/register', (req, res) => {
    res.render('auth/register')
})

// Rotta di registrazione
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username già esistente' });
        }

        const user_exists = await User.findOne({ email })
        if (user_exists) {
            return res.status(400).json({ message: 'Email già utilizzata' })
        }
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.redirect('/dashboard')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: false
}))

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');  // Reindirizza alla pagina di login o alla home
    });
});
module.exports = router