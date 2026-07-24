const FIR = require('../models/FIR');

// File a new FIR
const fileFIR = async (req, res) => {
  try {
    const { caseNumber, description, status } = req.body;

    const newFIR = new FIR({
      caseNumber,
      description,
      status: status || 'Open',
      // Grab the ID of the detective filing the report from their security token
      filedBy: req.user.userId 
    });

    await newFIR.save();
    
    res.status(201).json({ 
      message: 'FIR filed successfully.', 
      fir: newFIR 
    });

  } catch (error) {
    res.status(500).json({ message: 'Error filing FIR.', error: error.message });
  }
};

// Retrieve all active FIRs (for the city dashboard)
const getAllFIRs = async (req, res) => {
  try {
    const firs = await FIR.find().populate('filedBy', 'name badgeNumber');
    res.status(200).json(firs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving FIRs.', error: error.message });
  }
};

module.exports = { fileFIR, getAllFIRs };