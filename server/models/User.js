const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  regNo :{
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: 'password'
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  studentdetail_id: {
    type: String,
    default: ''
  },
  feedetail_id: {
    type: String,
    default: ''
  },
  studentacademicdetail_id: {
    type: String,
    default: ''
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Student', UserSchema);
