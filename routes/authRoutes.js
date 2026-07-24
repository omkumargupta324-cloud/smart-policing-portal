const express = require('express');
const router = express.Router();
// Import the logic we just wrote
const { registerUser, loginUser } = require('../controllers/authController');

// Define the POST routes
// When a POST request hits /register, it runs the registerUser function
router.post('/register', registerUser);

// When a POST request hits /login, it runs the loginUser function
router.post('/login', loginUser);

module.exports = router;