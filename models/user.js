const mongoose = require('mongoose');

const userSchema = mongoose.schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  },
  name: {type: String, required: true},
  address: {type: String, required: false},
});

module.exports = mongoose.model('User', userSchema);
