// Book an appointment to meet the SHO
const bookShoAppointment = async (req, res) => {
  try {
    const { citizenName, purpose, date } = req.body;

    // Generate a mock booking reference
    const bookingRef = 'BKG-' + Math.floor(1000 + Math.random() * 9000);

    res.status(201).json({
      message: 'Appointment request submitted successfully.',
      bookingId: bookingRef,
      status: 'Pending Confirmation',
      // Enforcing the required terminology for the assigned officer handling this request
      assignedTo: 'Investigating Officer (Community Relations)'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment.' });
  }
};

// Register as a Police Mitra / Volunteer
const registerVolunteer = async (req, res) => {
  try {
    const { volunteerName, skills } = req.body;

    const volunteerId = 'VOL-' + Date.now().toString().slice(-6);

    res.status(201).json({
      message: 'Volunteer application received.',
      registrationId: volunteerId,
      status: 'Under Background Review',
      assignedTo: 'Investigating Officer (Vetting Department)'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering volunteer.' });
  }
};

module.exports = { bookShoAppointment, registerVolunteer };