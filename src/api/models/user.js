const mongoose = require('../../database/index');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowarcase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: false,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
