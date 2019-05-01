const mongoose = require('mongoose');

const StudentDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  regNo: {
    type: String,
    default: ''
  },
  course: {
    type: String,
    default: '',
  },
  branch: {
    type: String,
    default: ''
  },
  currentsem: {
    type: String,
    default: ''
  },
  tg: {
    type: String,
    default: ''
  },
  tg_contact: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('StudentDetail', StudentDetailSchema);
