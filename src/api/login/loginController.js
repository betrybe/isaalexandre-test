const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = {
  secret: 'cc69f7d69921e3b5717aa7c4a5339b8e',
};

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

const User = require('../models/user');

const router = express.Router();

router.post('/', async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email }).select('+password');

  if (!email || !password) {
    return response.status(401).send({ message: 'All fields must be filled' });
  }
  if (!user) {
    return response
      .status(401)
      .send({ message: 'Incorrect username or password' });
  }
  if (password !== user.password || email !== user.email) {
    return response
      .status(401)
      .send({ message: 'Incorrect username or password' });
  }
  user.password = undefined;

  response.status(200).send({ token: generateToken({ id: user.id }) });
});

module.exports = (app) => app.use('/login', router);
