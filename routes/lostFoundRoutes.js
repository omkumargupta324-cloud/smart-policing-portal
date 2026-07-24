const express = require('express');
const router = express.Router();
const { reportLostItem, trackVehicle } = require('../controllers/lostFoundController');

// Public routes for reporting items and tracking vehicles
router.post('/report', reportLostItem);
router.post('/track-vehicle', trackVehicle);

module.exports = router;