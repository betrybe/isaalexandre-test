const express = require('express');

const authMiddleware = require('../middlewares/auth');

const Recipe = require('../models/recipe');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (request, response) => {
  const recipes = await Recipe.find();
  return response.status(200).send(recipes);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const recipes = await Recipe.findById(id);
  if (!recipes) {
    return response.status(404).send({ message: 'recipe not found' });
  }

  return response.status(200).send(recipes);
});

router.use(authMiddleware);

router.post('/', async (request, response) => {
  try {
    const recipe = await Recipe.create({
      ...request.body,
      userId: request.userId,
    });

    return response.status(201).json({ recipe });
  } catch (err) {
    return response
      .status(400)
      .send({ message: 'Invalid entries. Try again.' });
  }
});

router.put('/:_id', async (request, response) => {
  try {
    const { _id } = request.params;
    const userId = request.userId;

    const user = await User.findById(userId);
    const recipe = await Recipe.findById(_id);
    const data = { ...request.body, userId };

    if (user.role !== 'admin' && recipe.userId !== request.userId) {
      return response.status(401).send({ message: 'missing auth token' });
    }

    const recipeUpdate = await Recipe.findOneAndUpdate(_id, data, {
      new: true,
    });

    return response.status(200).json(recipeUpdate);
  } catch (err) {
    return response.status(401).send({ message: 'Error edit project' });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const userId = request.userId;

    const user = await User.findById(userId);
    const recipe = await Recipe.findById(id);

    if (user.role !== 'admin' && recipe.userId !== request.userId) {
      return response.status(401).send({ message: 'missing auth token' });
    }

    await Recipe.findByIdAndRemove(id);

    return response.status(204).send();
  } catch (err) {
    return response.status(401).send({ message: 'Error deleting project.' });
  }
});

module.exports = (app) => app.use('/recipes', router);
