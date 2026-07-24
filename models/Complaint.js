const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Resolved', 'Closed'], 
    default: 'Pending' 
  },
  escalationLevel: { type: Number, default: 0 }, // 0: IO, 1: SHO, 2: DSP, 3: ASP
  currentAssignedRole: { type: String, default: 'IO' },
  lastUpdatedAt: { type: Date, default: Date.now } // The timer starts from this exact moment
});

module.exports = mongoose.model('Complaint', complaintSchema);