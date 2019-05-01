const mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const SemesterWiseFeeStructureSchema = new mongoose.Schema({
  semester: {
    type: Number,
    default: 1
  },
  coursefee: {
    type: SchemaTypes.Double,
    default: 0
  },
  hostelfee: {
    type: SchemaTypes.Double,
    default: 0
  },
  messfee: {
    type: SchemaTypes.Double,
    default: 0
  },
  miscellaneous: {
    type: SchemaTypes.Double,
    default: 0
  }
});

const FeeStructureCommonSchema = new mongoose.Schema({
  course: {
    type: String,
    default: ''
  },
  branch: {
    type: String,
    default: ''
  },
  semester_fee: {
    type: [SemesterWiseFeeStructureSchema],
    default: []
  }
});

module.exports = mongoose.model('FeeStructureCommon', FeeStructureCommonSchema);
