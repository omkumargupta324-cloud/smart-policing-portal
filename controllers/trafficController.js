const Challan = require('../models/Challan');

// Issue a new traffic ticket
const issueChallan = async (req, res) => {
  try {
    const { challanId, vehiclePlate, violationType, fineAmount } = req.body;

    const newChallan = new Challan({
      challanId,
      vehiclePlate,
      violationType,
      fineAmount,
      // We grab the ID of the officer writing the ticket directly from their security token
      issuedBy: req.user.userId 
    });

    // Save to the database (Note: this will fail until we turn the database back on later!)
    await newChallan.save();
    
    res.status(201).json({ 
      message: 'Challan issued successfully.', 
      challan: newChallan 
    });

  } catch (error) {
    res.status(500).json({ message: 'Error issuing challan.', error: error.message });
  }
};

// Retrieve all tickets (for the dashboard)
const getAllChallans = async (req, res) => {
  try {
    const challans = await Challan.find().populate('issuedBy', 'name badgeNumber');
    res.status(200).json(challans);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving challans.', error: error.message });
  }
};

module.exports = { issueChallan, getAllChallans };