const mongoose = require('mongoose');

// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

// LOCAL
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

mongoose.connect(MONGO_DB_URL);
mongoose.Promise = global.Promise;

module.exports = mongoose;