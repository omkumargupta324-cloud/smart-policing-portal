// Process an incoming SOS panic alert
const triggerSOS = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // In a real application, we would save these coordinates to the database
    // and route them to the nearest active patrol car.
    
    // We will send back a mock dispatch response confirming the exact unit sent.
    res.status(200).json({
      message: 'SOS Alert Received! Help is on the way.',
      dispatchedUnit: 'Jamshedpur Central PCR Van-04',
      eta: '3 Minutes',
      status: 'Unit En Route',
      recordedLocation: { lat: latitude, lng: longitude }
    });

  } catch (error) {
    res.status(500).json({ message: 'Emergency dispatch failed. Call 100 directly.' });
  }
};

module.exports = { triggerSOS };