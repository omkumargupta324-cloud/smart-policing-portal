const express = require('express');
const router = express.Router();
const { getLiveAlerts, getMapData } = require('../controllers/publicUpdatesController');

// Public routes for the live dashboard
router.get('/alerts', getLiveAlerts);
router.get('/map-data', getMapData);

module.exports = router;