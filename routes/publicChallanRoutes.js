const express = require('express');
const router = express.Router();
const { searchChallan, processPayment } = require('../controllers/publicChallanController');

// Public routes for citizens to search and pay fines
router.post('/search', searchChallan);
router.post('/pay', processPayment);

module.exports = router;