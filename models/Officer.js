const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  badgeNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    // Enforcing your specific terminology alongside the Admin role
    enum: ['Traffic Officer', 'Investigating Officer', 'Super Admin'],
    required: true
  },
  accountStatus: {
    type: String,
    enum: ['Pending', 'Active', 'Rejected'],
    default: 'Pending' // The Super Admin security lock! 
  }
}, { timestamps: true });

module.exports = mongoose.model('Officer', officerSchema);