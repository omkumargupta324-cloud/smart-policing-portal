const express = require('express');
const router = express.Router();
const { issueChallan, getAllChallans } = require('../controllers/trafficController');
const { verifyToken } = require('../middleware/authMiddleware');

// The verifyToken middleware runs FIRST. If it fails, the request never reaches the controller.
router.post('/issue', verifyToken, issueChallan);
router.get('/all', verifyToken, getAllChallans);

module.exports = router;