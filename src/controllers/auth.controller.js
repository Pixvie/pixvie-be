const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../utils/validations/auth.validation');
const cookieOptions = require('../config/cookie.config');

const signup = async (req, res) => {
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
        const user = await newUser.save();
        res.status(201).json({message: 'User created successfully', id:user._id, username:user.username, email:user.email});
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const signin = async (req, res) => {
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
    const token = jwt.sign({ _id: existUser._id, username: existUser.username }, process.env.JWT_SECRET);
    res.cookie('jwtToken', token, cookieOptions());
    return res.status(200).json({ id: existUser._id, username: existUser.username });
};

const logout = async (req, res) => {
    res.clearCookie('jwtToken');
    res.status(200).json({ message: 'User logged out' });
};

const profile = async (req, res) => {
    const decodedJWT = jwt.verify(req.cookies.jwtToken, process.env.JWT_SECRET);
    const {_id: id, username} = jwt.decode(req.cookies.jwtToken)
    if(decodedJWT) return res.status(200).json({ id, username });
}



module.exports = { signin, signup, logout, profile };