const joi = require('joi');

const registerValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
