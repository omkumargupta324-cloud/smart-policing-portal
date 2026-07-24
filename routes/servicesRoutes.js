const express = require('express');
const router = express.Router();
const { submitApplication, payApplicationFee } = require('../controllers/servicesController');

// Public routes for verification and NOC services
router.post('/apply', submitApplication);
router.post('/pay', payApplicationFee);

module.exports = router;