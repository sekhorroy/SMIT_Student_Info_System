const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  empId: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  }
});

AdminSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

AdminSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('AdminDetail', AdminSchema);
