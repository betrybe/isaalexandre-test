const express = require('express');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

require('./users/userController')(app);
require('./login/loginController')(app);
require('./recipes/recipesController')(app);

module.exports = app;
