const express = require('express');

const authMiddleware = require('../middlewares/auth');

const Recipe = require('../models/recipe');

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
    const { name, ingredients, preparation } = request.body;

    const { userId } = request;

    const recipe = await Recipe.create({
      name,
      ingredients,
      preparation,
      userId,
    });

    return response.status(201).json({ recipe });
  } catch (err) {
    return response
      .status(400)
      .send({ message: 'Invalid entries. Try again.' });
  }
});

module.exports = (app) => app.use('/recipes', router);
