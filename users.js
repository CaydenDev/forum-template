const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && user.password === req.body.password) {
        req.session.username = user.username;
        req.session.role = user.role;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});


router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role || 'user'
    });
    await newUser.save();
    res.redirect('/login');
});


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
