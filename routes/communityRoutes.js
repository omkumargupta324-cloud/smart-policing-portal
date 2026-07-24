const express = require('express');
const router = express.Router();
const { bookShoAppointment, registerVolunteer } = require('../controllers/communityController');

// Public routes for community engagement
router.post('/book-sho', bookShoAppointment);
router.post('/volunteer', registerVolunteer);

module.exports = router;