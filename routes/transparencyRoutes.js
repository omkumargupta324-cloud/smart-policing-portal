const express = require('express');
const router = express.Router();
const { getPublicStats, getPublicNotices } = require('../controllers/transparencyController');

// Public routes for data transparency
router.get('/stats', getPublicStats);
router.get('/notices', getPublicNotices);

module.exports = router;