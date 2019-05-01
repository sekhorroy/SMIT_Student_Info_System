const mongoose = require('mongoose');

const SubjectDetailSchema = new mongoose.Schema({
  subjectname: {
    type: String,
    default: ''
  },
  subjectcode: {
    type: String,
    default: ''
  }
});

const ElectiveSubjectDetailSchema = new mongoose.Schema({
  subjectname: {
    type: String,
    default: ''
  },
  subjectcode: {
    type: String,
    default: ''
  },
  seatsavailable: {
    type: Number,
    default: 0
  }
});

const LabDetailSchema = new mongoose.Schema({
  subjectname: {
    type: String,
    default: ''
  },
  subjectcode: {
   type: String,
   default: ''
  }
});

const SemesterSubjectSchema = new mongoose.Schema({
  branch: {
    type: String,
    default: ''
  },
  semester: {
    type: Number,
    default: 0
  },
  subject: [SubjectDetailSchema],
  electivesubject: [ElectiveSubjectDetailSchema],
  lab:[LabDetailSchema],
  totalelectivesubjects: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('SubjectDetail', SemesterSubjectSchema);
