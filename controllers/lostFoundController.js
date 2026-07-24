// Register a newly lost item (documents, phones, etc.)
const reportLostItem = async (req, res) => {
  try {
    const { ownerName, itemName, description } = req.body;

    // Generate a mock report ID
    const reportId = 'LNF-' + Math.floor(100000 + Math.random() * 900000);

    res.status(201).json({
      message: 'Lost item officially registered in the database.',
      reportId: reportId,
      status: 'Active Search',
      assignedTo: 'Investigating Officer (Pending Assignment)'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error filing lost report.', error: error.message });
  }
};

// Track the status of a stolen vehicle
const trackVehicle = async (req, res) => {
  try {
    const { vehiclePlate } = req.body;

    // Mocking a database search result for a stolen vehicle
    res.status(200).json({
      vehiclePlate: vehiclePlate.toUpperCase(),
      status: 'Flagged - High Alert',
      lastSpotted: 'Marine Drive Checkpoint (4 hours ago)',
      assignedTo: 'Investigating Officer (Auto-Theft Squad)'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving vehicle status.', error: error.message });
  }
};

module.exports = { reportLostItem, trackVehicle };