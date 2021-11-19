const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/', async (request, response) => {
  const { email } = request.body;
  try {
    if (await User.findOne({ email })) {
      return response.status(409).send({ message: 'Email already registered' });
    }

    const data = await User.create(request.body);
    const user = { _id: data.id, name: data.name, email: data.email, role: data.role };

    return response.status(201).json({ user });
  } catch (err) {
    return response
    .status(400)
    .send({ message: 'Invalid entries. Try again.' });
    // return response.status(400).send({ message: err });
  }
});

module.exports = (app) => app.use('/users', router);
