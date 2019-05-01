var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const SubjectSchema = new mongoose.Schema({
  subjectname: {
    type: String,
    default: ''
  },
  subjectcode: {
    type: String,
    default: ''
  },
  assignment1: {
    type: Number,
    default: 0
  },
  assignment2: {
    type: Number,
    default: 0
  },
  sessional1: {
    type: Number,
    default: 0
  },
  sessional2: {
    type: Number,
    default: 0
  },
  quiz1: {
    type: Number,
    default: 0
  },
  quiz2: {
    type: Number,
    default: 0
  },
  attendance: {
   type: Number,
   default: 0
  },
  finalsem: {
    type: Number,
    default: 0
  }
});

const LabSchema = new mongoose.Schema({
  labname: {
    type: String,
    default: ''
  },
  labcode: {
    type: String,
    default: ''
  },
  attendance: {
    type: Number,
    default: 0
  },
  internalmarks: {
    type: Number,
    default: 0
  },
  externalmarks: {
    type: Number,
    default: 0
  }
});

const ChoiceSchema = new mongoose.Schema({
  subjectname: {
    type: String,
    default: ''
  },
  subjectcode: {
    type: String,
    default: ''
  }
});

const StudentAcademicSchema = new mongoose.Schema({
  regNo: {
    type: String,
    default: ''
  },
  branch: {
    type: String,
    default: ''
  },
  currentsem: {
    type: String,
    default: ''
  },
  sec: {
    type: String,
    default: ''
  },
  subject: [SubjectSchema],
  lab: [LabSchema],
  chooseelective: {
    type: [ChoiceSchema],
    default: []
  },
  cgpa: {
    type: SchemaTypes.Double,
    default: 0
  },
  isAutoAssigned: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('StudentAcademicDetail', StudentAcademicSchema);
