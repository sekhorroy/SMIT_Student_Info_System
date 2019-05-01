const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0
  },
  value: {
    type: String,
    default: ''
  }
});

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    default: ''
  },

  option: {
    type: [OptionSchema],
    default: []
  },

  answer: {
    type: String,
    default: ''
  }
});

const ResultSchema = new mongoose.Schema({
  regNo: {
    type: String,
    default: ''
  },
  quiz_id: {
    type: String,
    default: ''
  },
  correct: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  }
});

const QuizSchema = new mongoose.Schema({
  semester: {
    type: String,
    default: ''
  },
  branch: {
    type: String,
    default: ''
  },
  sec: {
    type: String,
    default: ''
  },
  noofstudents: {
    type: Number,
    default: 0
  },
  quiz: {
    type: [QuestionSchema],
    default: []
  },
  result: {
    type: [ResultSchema],
    default: []
  },
  isVisible: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('QuizDetail', QuizSchema);
