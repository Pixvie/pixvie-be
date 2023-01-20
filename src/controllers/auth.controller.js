const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../utils/validations/auth.validation');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const { error } = registerValidation({username, email, password});
    
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const { error } = loginValidation({ email, password });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const existUser = await User.findOne({ email });
    if (!existUser) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const validPassword = await bcrypt.compare(password, existUser.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ _id: existUser._id, username: existUser.username }, process.env.TOKEN_SECRET);
    return res.status(200).json({ token });
};


module.exports = { register, login };