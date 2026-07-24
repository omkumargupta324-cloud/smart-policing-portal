const express = require('express');
const router = express.Router();
const { fileFIR, getAllFIRs } = require('../controllers/firController');
const { verifyToken } = require('../middleware/authMiddleware');

// The verifyToken middleware ensures only logged-in personnel can access these routes
router.post('/file', verifyToken, fileFIR);
router.get('/all', verifyToken, getAllFIRs);

module.exports = router;