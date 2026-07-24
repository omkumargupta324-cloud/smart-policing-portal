// Mock handling for video evidence uploads
const uploadFootage = async (req, res) => {
  try {
    const { incidentType, location } = req.body;
    
    // In a real app, middleware like 'multer' would process the actual video file here
    const evidenceId = 'EVD-' + Math.floor(10000 + Math.random() * 90000);

    res.status(201).json({
      message: 'Secure file transfer complete.',
      evidenceId: evidenceId,
      status: 'In Review',
      // Enforcing the required terminology
      assignedTo: 'Investigating Officer (Digital Forensics)'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading footage.' });
  }
};

// Register a business/private CCTV camera to the police network
const registerCCTV = async (req, res) => {
  try {
    const { businessName, cameraCount, address } = req.body;

    const nodeId = 'CAM-NODE-' + Date.now().toString().slice(-5);

    res.status(201).json({
      message: 'CCTV Node added to Central Radar.',
      nodeId: nodeId,
      status: 'Active',
      assignedTo: 'Investigating Officer (Surveillance Unit)'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering CCTV.' });
  }
};

module.exports = { uploadFootage, registerCCTV };