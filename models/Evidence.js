const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema({
  caseReference: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  uploadedBy: { type: String, default: 'Anonymous Citizen' },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Evidence', evidenceSchema);