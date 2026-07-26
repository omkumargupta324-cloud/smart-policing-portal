const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose'); 
const http = require('http'); // NEW: Required for WebSockets
const { Server } = require('socket.io'); // NEW: Real-time networking

// Load the secrets from the .env file
dotenv.config();
const connectDB = require('./config/db');
connectDB();
const startEscalationEngine = require('./utils/escalationEngine');
startEscalationEngine();

// Initialize the Express application
const app = express();

// NEW: Wrap the Express app with an HTTP server to support WebSockets
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Middleware so our server understands JSON data
app.use(express.json());
app.use(cors());
// Serve static frontend files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// MOCK DATABASE: Police Department Hierarchy
// ==========================================
const departmentStructure = {
  jurisdiction: "Omnagar",
  chiefCommandingOfficer: "SSP, Omnagar", 
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

app.get('/', (req, res) => {
  res.send('Smart Policing API is online!');
});

app.get('/api/hierarchy', (req, res) => {
  res.json({
    message: "Omnagar Police Department structure retrieved successfully",
    data: departmentStructure
  });
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const trafficRoutes = require('./routes/trafficRoutes');
app.use('/api/traffic', trafficRoutes);
const firRoutes = require('./routes/firRoutes');
app.use('/api/fir', firRoutes);
const complaintRoutes = require('./routes/complaintRoutes');
app.use('/api/complaints', complaintRoutes);
const publicChallanRoutes = require('./routes/publicChallanRoutes');
app.use('/api/public-challans', publicChallanRoutes);
const emergencyRoutes = require('./routes/emergencyRoutes');
app.use('/api/emergency', emergencyRoutes);
const publicUpdatesRoutes = require('./routes/publicUpdatesRoutes');
app.use('/api/updates', publicUpdatesRoutes);
const lostFoundRoutes = require('./routes/lostFoundRoutes');
app.use('/api/lost-found', lostFoundRoutes);
const servicesRoutes = require('./routes/servicesRoutes');
app.use('/api/services', servicesRoutes);
const resourcesRoutes = require('./routes/resourcesRoutes');
app.use('/api/resources', resourcesRoutes);
const communityRoutes = require('./routes/communityRoutes');
app.use('/api/community', communityRoutes);
const evidenceRoutes = require('./routes/evidenceRoutes');
app.use('/api/evidence', evidenceRoutes);
const transparencyRoutes = require('./routes/transparencyRoutes');
app.use('/api/transparency', transparencyRoutes);

// ==========================================
// TRAFFIC CHALLAN DATABASE ROUTE
// ==========================================
app.get('/api/challans', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const challans = await db.collection('challans').find({}).sort({ _id: -1 }).toArray();
    res.json(challans);
  } catch (error) {
    console.error("Error fetching challans:", error);
    res.status(500).json({ error: "Failed to fetch challan data from the database" });
  }
});

// ==========================================
// NEW: REAL-TIME SOS WEBSOCKET HUB
// ==========================================
io.on('connection', (socket) => {
  console.log(`📱 Device connected to Emergency Network: ${socket.id}`);
  
  // Listen for citizens triggering the SOS button
  socket.on('trigger-sos', (alertData) => {
    console.log('\n🚨 URGENT: SOS RECEIVED! 🚨');
    console.log(alertData);
    
    // Instantly blast this alert to all connected police dashboards
    io.emit('sos-alert', alertData);
  });

  socket.on('disconnect', () => {
    console.log(`Device disconnected: ${socket.id}`);
  });
});

// ==========================================
// SERVER INITIALIZATION
// ==========================================
const PORT = process.env.PORT || 5000;
// NOTE: Changed from app.listen to server.listen to support WebSockets
server.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`🚀 SERVER IS LIVE ON PORT ${PORT}`);
  console.log(`🚓 JURISDICTION: Omnagar`);
  console.log(`📡 WEBSOCKETS: Active and Listening`);
  console.log(`========================================\n`);
});