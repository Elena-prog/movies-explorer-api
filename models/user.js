const mongoose = require('mongoose');
const { REGEXP_EMAIL } = require('../constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    }
  },  
  {
    versionKey: false,
  },
)

userSchema.path('email').validate((email) => {
  const emailRegex = REGEXP_EMAIL;
  return emailRegex.test(email);
}, 'Invalid email.');

module.exports = mongoose.model('user', userSchema)
