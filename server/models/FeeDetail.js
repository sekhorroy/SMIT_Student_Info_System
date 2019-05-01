const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const SemesterFeeSchema = new mongoose.Schema({
  semester: {
    type: Number,
    default: 0
  },
  messdeposit: {
    type: SchemaTypes.Double,
    default: 0
  },
  libraryfine: {
    type: SchemaTypes.Double,
    default: 0
  },
  examfee: {
    type: SchemaTypes.Double,
    default: 0
  },
  otherfee: {
    type: SchemaTypes.Double,
    default: 0
  },
  ispaid: {
    type: Boolean,
    default: false
  },
  transaction_id: {
    type: String,
    default: ''
  },
  order_id: {
    type: String,
    default: ''
  }
});

const FeeDetailSchema = new mongoose.Schema({
  regNo: {
    type: String,
    default: ''
  },
  semester_fee: {
    type: [SemesterFeeSchema],
    default: []
  }
});

module.exports = mongoose.model('FeeDetail', FeeDetailSchema);
