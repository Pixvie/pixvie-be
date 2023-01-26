const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controller');


router.post('/signin', signin );
router.post('/signup', signup );
router.get('/logout', logout);


module.exports = router;
