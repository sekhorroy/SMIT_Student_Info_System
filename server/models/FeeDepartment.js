const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const FeeDepartmentSchema = new mongoose.Schema({
  empId: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

FeeDepartmentSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

FeeDepartmentSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('FeeDepartment', FeeDepartmentSchema);
