// Fetch scrolling text alerts for the public
const getLiveAlerts = async (req, res) => {
  try {
    // Mocking real-time city alerts
    const alerts = [
      { id: 1, type: 'Traffic', severity: 'high', message: 'Severe collision on Marine Drive. 2 lanes closed. Expect 30m delays.', time: 'Just now' },
      { id: 2, type: 'Security', severity: 'medium', message: 'VIP Convoy scheduled through Sakchi roundabout at 14:00.', time: '15 mins ago' },
      { id: 3, type: 'Weather', severity: 'medium', message: 'Yellow Alert: Heavy thunderstorms and low visibility expected tonight.', time: '1 hour ago' },
      { id: 4, type: 'Crime', severity: 'low', message: 'Pickpocketing spike reported in Bistupur market area. Remain vigilant.', time: '3 hours ago' }
    ];
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alerts.' });
  }
};

// Fetch GPS coordinates for the live map
const getMapData = async (req, res) => {
  try {
    // Mocking incident coordinates around the city
    const incidents = [
      { lat: 22.8046, lng: 86.2029, type: 'accident', title: 'Vehicle Collision' },
      { lat: 22.7950, lng: 86.2100, type: 'roadblock', title: 'Police Barricade' },
      { lat: 22.8120, lng: 86.1850, type: 'hazard', title: 'Fallen Tree' }
    ];
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching map data.' });
  }
};

module.exports = { getLiveAlerts, getMapData };