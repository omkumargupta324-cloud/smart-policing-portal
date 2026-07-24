const mongoose = require('mongoose');

const firSchema = new mongoose.Schema({
  caseNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  // Links to the User model (the officer filing the report)
  filedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  // Links to the User model (the detective assigned)
  assignedDetective: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  status: { 
    type: String, 
    enum: ['Open', 'Under Investigation', 'Closed'],
    default: 'Open'
  }
}, { timestamps: true });

module.exports = mongoose.model('FIR', firSchema);