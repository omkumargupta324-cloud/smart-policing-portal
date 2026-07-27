const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Evidence = require('../models/Evidence');

// Ensure public/uploads directory exists
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure file storage using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// POST: Upload evidence file
router.post('/upload', upload.single('evidenceFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newEvidence = new Evidence({
      caseReference: req.body.caseReference,
      title: req.body.title,
      description: req.body.description,
      fileUrl: '/uploads/' + req.file.filename,
      uploadedBy: req.body.uploadedBy || 'Anonymous Citizen'
    });

    const savedEvidence = await newEvidence.save();
    res.json({ message: 'Evidence uploaded successfully', data: savedEvidence });
  } catch (err) {
    res.status(500).json({ error: 'Server error processing file' });
  }
});

// GET: Fetch all evidence records
router.get('/', async (req, res) => {
  try {
    const records = await Evidence.find().sort({ uploadedAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch evidence records' });
  }
});

module.exports = router;