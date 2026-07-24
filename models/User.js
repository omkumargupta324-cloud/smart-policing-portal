const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  badgeNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  roleId: { type: String, required: true },
  accountStatus: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('User', userSchema);