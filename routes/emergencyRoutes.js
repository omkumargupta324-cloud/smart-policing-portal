const express = require('express');
const router = express.Router();
const { triggerSOS } = require('../controllers/emergencyController');

// Public emergency route for the panic button
router.post('/sos', triggerSOS);

module.exports = router;