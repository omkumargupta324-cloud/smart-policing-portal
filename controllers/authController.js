const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. Register a new officer
const registerUser = async (req, res) => {
  try {
    const { badgeNumber, name, password, department, roleId } = req.body;

    // Check if this badge number is already in the database
    const existingUser = await User.findOne({ badgeNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'Officer already registered.' });
    }

    // Encrypt (hash) the password so it isn't stored as plain text
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
      badgeNumber,
      name,
      password: hashedPassword,
      department,
      roleId,
      accountStatus: 'Pending'
    });

    await newUser.save();
    res.status(201).json({ message: 'Officer registered successfully! Pending admin approval.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. Login officer
const loginUser = async (req, res) => {
  try {
    const { badgeNumber, password } = req.body;
    
    const user = await User.findOne({ badgeNumber });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, roleId: user.roleId }, 
      process.env.JWT_SECRET || 'fallback_secret_key', 
      { expiresIn: '1h' }
    );
    
    res.status(200).json({ token, message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Export the controller functions
module.exports = {
  registerUser,
  loginUser
};