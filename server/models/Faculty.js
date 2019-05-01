const mongoose = require('mongoose');

const bcrypt = require ('bcryptjs');

const FacultyClassSchema = new mongoose.Schema({
  semester: {
    type: Number,
    default: 0
  },
  subjectname: {
    type: String,
    default: 0
  },
  subjectcode: {
    type: String,
    default: 0
  },
  sec: {
    type: String,
    default: 0
  }
});

const FacultySchema = new mongoose.Schema({
  empId: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  branch: {
    type: String,
    default: ''
  },
  classes: {
    type: [FacultyClassSchema],
    default: []
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});


FacultySchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

FacultySchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Faculty', FacultySchema);
