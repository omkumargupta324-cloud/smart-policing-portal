const mongoose = require('mongoose');

const missingWantedSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  category: { type: String, enum: ['Missing', 'Wanted'], required: true },
  age: { type: Number },
  gender: { type: String },
  lastSeenLocation: { type: String, required: true },
  reward: { type: String, default: 'N/A' },
  photoUrl: { type: String, default: 'https://via.placeholder.com/300x200' },
  description: { type: String },
  contactStation: { type: String, default: 'Central Thana, Omnagar' },
  status: { type: String, enum: ['Active', 'Resolved'], default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MissingWanted', missingWantedSchema);