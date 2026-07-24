const express = require('express');
const router = express.Router();
const { fileComplaint } = require('../controllers/complaintController');
const Complaint = require('../models/Complaint'); // <-- THIS IS THE MISSING PIECE!

// Public route for citizens to submit complaints
router.post('/submit', fileComplaint);

// Fetch all complaints for the Officer Dashboard
router.get('/', async (req, res) => {
  try {
    // This tells MongoDB to find all tickets and sort them newest to oldest
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    
    // This packages the tickets as JSON and sends them to your frontend board
    res.json(complaints);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});

module.exports = router;