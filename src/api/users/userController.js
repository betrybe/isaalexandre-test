const express = require('express');
const validator = require('validator');

const User = require('../models/user');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', async (request, response) => {
  const { email } = request.body;
  try {
    if (await User.findOne({ email })) {
      return response.status(409).send({ message: 'Email already registered' });
    }

    if (!validator.isEmail(email)) {
      return response
        .status(400)
        .send({ message: 'Invalid entries. Try again.' });
    }

    const user = await User.create({ ...request.body, role: 'user' });

    user.password = undefined;

    return response.status(201).json({ user });
  } catch (err) {
    return response
      .status(400)
      .send({ message: 'Invalid entries. Try again.' });
  }
});

router.use(authMiddleware);

router.post('/admin', async (request, response) => {
  const { email } = request.body;
  const userFilter = await User.findById(request.userId);
  const role = 'admin';

  if (userFilter.role !== 'admin') {
    return response
      .status(403)
      .send({ message: 'Only admins can register new admins' });
  }

  if (await User.findOne({ email })) {
    return response.status(409).send({ message: 'Email already registered' });
  }

  const user = await User.create({ ...request.body, role });

  user.password = undefined;

  return response.status(201).json({ user });
});

module.exports = (app) => app.use('/users', router);
