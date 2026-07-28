const express = require('express');
const router = express.Router();
const { searchChallan, processPayment } = require('../controllers/publicChallanController');

// GET all challans for the public database view
router.get('/', async (req, res) => {
  try {
    const Challan = require('../models/Challan');
    const challans = await Challan.find().sort({ createdAt: -1 });
    res.json(challans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch challans' });
  }
});

// Public routes for citizens to search and pay fines
router.post('/search', searchChallan);
router.post('/pay', processPayment);

module.exports = router;