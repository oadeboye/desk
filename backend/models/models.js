const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  }
});

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
}
