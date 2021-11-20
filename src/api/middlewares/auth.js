const jwt = require('jsonwebtoken');

const authConfig = {
  secret: 'cc69f7d69921e3b5717aa7c4a5339b8e',
};

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  jwt.verify(authHeader, authConfig.secret, (err, decoded) => {
    if (err) return response.status(401).send({ message: 'jwt malformed' });

    request.userId = decoded.id;

    return next();
  });
};
