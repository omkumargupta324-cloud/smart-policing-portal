const express = require('express');
const router = express.Router();
const { uploadFootage, registerCCTV } = require('../controllers/evidenceController');

// Public routes for evidence and CCTV
router.post('/upload', uploadFootage);
router.post('/register-cctv', registerCCTV);

module.exports = router;