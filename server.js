const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load the secrets from the .env file
dotenv.config();
const connectDB = require('./config/db');
connectDB();
const startEscalationEngine = require('./utils/escalationEngine');
startEscalationEngine();

// Initialize the Express application
const app = express();

// Middleware so our server understands JSON data
app.use(express.json());
app.use(cors());
// Serve static frontend files from the 'public' folder
app.use(express.static('public'));

// ==========================================
// MOCK DATABASE: Police Department Hierarchy
// ==========================================
const departmentStructure = {
  jurisdiction: "Omnagar",
  chiefCommandingOfficer: "SSP, Omnagar", // Apex Command
  divisions: {
    lawAndOrderWing: {
      commandingOfficer: "ASP (Law & Order)",
      reportsTo: "SSP, Omnagar",
      zones: [
        {
          zoneName: "Zone A",
          stations: [
            { stationName: "Central Thana", type: "Regular", sho: "Unassigned" },
            { stationName: "East Thana", type: "Regular", sho: "Unassigned" }
          ]
        }
      ],
      specializedUnits: [
        { 
          stationName: "Cyber Police Station", 
          type: "Cyber", 
          commandingOfficer: "DSP (Cyber)",
          reportsTo: "SSP, Omnagar", 
          sho: "Unassigned" 
        }
      ]
    },
    trafficWing: {
      commandingOfficer: "ASP (Traffic)",
      reportsTo: "SSP, Omnagar",
      stations: [
        { stationName: "City Traffic Thana", type: "Traffic", sho: "Unassigned" }
      ]
    }
  }
};

// ==========================================
// API ROUTES
// ==========================================

// A simple test route to make sure it works
app.get('/', (req, res) => {
  res.send('Smart Policing API is online!');
});

// Fetch the Registration Hierarchy
app.get('/api/hierarchy', (req, res) => {
  res.json({
    message: "Omnagar Police Department structure retrieved successfully",
    data: departmentStructure
  });
});

// Import and use the authentication routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
// Import and use the traffic module routes
const trafficRoutes = require('./routes/trafficRoutes');
app.use('/api/traffic', trafficRoutes);
// Import and use the city police module routes
const firRoutes = require('./routes/firRoutes');
app.use('/api/fir', firRoutes);
// Import and use the public complaint routes
const complaintRoutes = require('./routes/complaintRoutes');
app.use('/api/complaints', complaintRoutes);
// Import and use the public challan payment routes
const publicChallanRoutes = require('./routes/publicChallanRoutes');
app.use('/api/public-challans', publicChallanRoutes);
// Import and use the emergency SOS routes
const emergencyRoutes = require('./routes/emergencyRoutes');
app.use('/api/emergency', emergencyRoutes);
// Import and use the live public updates routes
const publicUpdatesRoutes = require('./routes/publicUpdatesRoutes');
app.use('/api/updates', publicUpdatesRoutes);
// Import and use the lost & found routes
const lostFoundRoutes = require('./routes/lostFoundRoutes');
app.use('/api/lost-found', lostFoundRoutes);
// Import and use the public services and certificates routes
const servicesRoutes = require('./routes/servicesRoutes');
app.use('/api/services', servicesRoutes);
// Import and use the awareness resources routes
const resourcesRoutes = require('./routes/resourcesRoutes');
app.use('/api/resources', resourcesRoutes);
// Import and use the community connect routes
const communityRoutes = require('./routes/communityRoutes');
app.use('/api/community', communityRoutes);
// Import and use the evidence and CCTV routes
const evidenceRoutes = require('./routes/evidenceRoutes');
app.use('/api/evidence', evidenceRoutes);
// Import and use the transparency and stats routes
const transparencyRoutes = require('./routes/transparencyRoutes');
app.use('/api/transparency', transparencyRoutes);

// ==========================================
// SERVER INITIALIZATION
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`🚀 SERVER IS LIVE ON PORT ${PORT}`);
  console.log(`🚓 JURISDICTION: Omnagar`);
  console.log(`👉 View API Status: http://localhost:${PORT}`);
  console.log(`👉 View Hierarchy:  http://localhost:${PORT}/api/hierarchy`);
  console.log(`========================================\n`);
});