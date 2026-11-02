require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); 

const seedMasterAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('om030303', salt);

    await User.create({
      badgeNumber: 'TRF-102',
      name: 'Om Kumar Gupta',
      password: hashedPassword,
      department: 'Traffic Police',
      roleId: 'Admin'
    });

    console.log('✅ Officer TRF-102 created successfully. Password: om030303');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedMasterAdmin();