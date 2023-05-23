const express = require('express');
const router = express.Router();
const passport = require('passport');
const { profile, signin, signup, logout } = require('../controllers/auth.controller');

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/logout', logout);
router.get('/profile', passport.authenticate('jwt', { session: false }), profile);

module.exports = router;
