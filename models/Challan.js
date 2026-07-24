const mongoose = require('mongoose');

const challanSchema = new mongoose.Schema({
  challanId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  vehiclePlate: { 
    type: String, 
    required: true 
  },
  violationType: { 
    type: String, 
    required: true 
  },
  fineAmount: { 
    type: Number, 
    required: true 
  },
  // Links to the User model (the traffic officer writing the ticket)
  issuedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  status: { 
    type: String, 
    enum: ['Unpaid', 'Paid', 'Contested'],
    default: 'Unpaid'
  }
}, { timestamps: true });

module.exports = mongoose.model('Challan', challanSchema);