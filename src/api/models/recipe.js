const mongoose = require('../../database/index');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  preparation: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
