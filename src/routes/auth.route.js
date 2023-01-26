const express = require('express');
const router = express.Router();
const { signin, signup, logout } = require('../controllers/auth.controller');


router.post('/signin', signin );
router.post('/signup', signup );
router.get('/logout', logout);


module.exports = router;
