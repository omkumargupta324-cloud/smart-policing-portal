// Fetch dynamic awareness content and helplines
const getResources = async (req, res) => {
  try {
    const data = {
      helplines: [
        { name: 'National Emergency', number: '112', icon: 'fa-truck-medical' },
        { name: 'Police Control Room', number: '100', icon: 'fa-building-shield' },
        { name: 'Women Helpline', number: '1091', icon: 'fa-person-dress' },
        { name: 'Cyber Crime', number: '1930', icon: 'fa-computer-shield' },
        { name: 'Traffic Police', number: '1095', icon: 'fa-traffic-light' }
      ],
      cyberTips: [
        "Never share your bank OTP or PIN with anyone over the phone.",
        "Enable Two-Factor Authentication (2FA) on all social media accounts.",
        "Always verify the URL starts with 'https' before making online payments.",
        "Do not click on suspicious links sent via SMS claiming your electricity will be cut."
      ]
    };
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources.' });
  }
};

module.exports = { getResources };