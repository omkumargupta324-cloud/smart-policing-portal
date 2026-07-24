const express = require('express');
const router = express.Router();
const { getResources } = require('../controllers/resourcesController');

// Public route for awareness content
router.get('/', getResources);

module.exports = router;