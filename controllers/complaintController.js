const Complaint = require('../models/Complaint');

// Submit a new public complaint and SAVE it to MongoDB
const fileComplaint = async (req, res) => {
  try {
    const { citizenName, phone, incidentType, description } = req.body;

    // 1. Package the data into a real MongoDB document
    const newComplaint = new Complaint({
      citizenName: citizenName,
      phone: phone,
      title: incidentType || 'Citizen Report', // Mapping incidentType to title for the dashboard
      incidentType: incidentType,
      description: description,
      status: 'Pending',
      assignedTo: 'Level 0 Officer', // Starting point for the escalation engine
      escalationLevel: 0
    });

    // 2. Physically save it to the database
    const savedComplaint = await newComplaint.save();

    // 3. Send the REAL database ID back to the citizen's screen
    res.status(201).json({
      message: 'Complaint registered successfully.',
      trackingId: savedComplaint._id, // Using the real MongoDB ID
      _id: savedComplaint._id,
      status: 'Pending Review',
      assignedTo: 'Level 0 Officer',
    });

  } catch (error) {
    console.error("Database Save Error:", error);
    res.status(500).json({ message: 'Error filing complaint.', error: error.message });
  }
};

module.exports = { fileComplaint };