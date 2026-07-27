const express = require('express');
const router = express.Router();
const MissingWanted = require('../models/MissingWanted');

// GET all active records
router.get('/', async (req, res) => {
  try {
    const records = await MissingWanted.find({ status: 'Active' }).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

// POST a new missing/wanted person profile
router.post('/', async (req, res) => {
  try {
    const newRecord = new MissingWanted(req.body);
    const savedRecord = await newRecord.save();
    res.json({ message: 'Record created successfully', data: savedRecord });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create record' });
  }
});

module.exports = router;