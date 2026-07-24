const cron = require('node-cron');
const Complaint = require('../models/Complaint');

const startEscalationEngine = () => {
  // Runs the sweep every single minute for rapid testing
  cron.schedule('* * * * *', async () => {
    console.log('🔄 [CRON] Sweeping database for expired complaints...');

    try {
      // Temporarily set to current time so it immediately catches your recent test ticket
      const fortyEightHoursAgo = new Date(Date.now());

      // Find all complaints that are NOT resolved AND match our test time window
      const expiredComplaints = await Complaint.find({
        status: { $in: ['Pending', 'In Progress'] },
        lastUpdatedAt: { $lt: fortyEightHoursAgo },
        escalationLevel: { $lt: 3 } // Don't escalate past ASP (Level 3)
      });

      if (expiredComplaints.length === 0) {
        console.log('✨ [CRON] No complaints found matching escalation criteria.');
        return;
      }

      // The Hierarchy Array
      const hierarchy = ['IO', 'SHO', 'DSP', 'ASP'];

      // Process each expired complaint
      for (let complaint of expiredComplaints) {
        complaint.escalationLevel += 1; 
        complaint.currentAssignedRole = hierarchy[complaint.escalationLevel];
        complaint.lastUpdatedAt = Date.now(); // Reset the clock

        await complaint.save();
        
        console.log(`🚨 [ESCALATION] Complaint ${complaint._id} bumped to ${complaint.currentAssignedRole}`);
      }

    } catch (error) {
      console.error('🔴 [CRON] Escalation Engine Error:', error);
    }
  });
};

module.exports = startEscalationEngine;