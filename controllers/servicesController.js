// Process a new verification/NOC application
const submitApplication = async (req, res) => {
  try {
    const { applicantName, serviceType, documentId } = req.body;

    // Generate a mock Application Reference Number
    const appRefNumber = 'APP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

    // Set a mock fee based on the service type
    let fee = 500; // Default fee
    if (serviceType === 'Event NOC') fee = 2500;
    if (serviceType === 'Tenant Verification') fee = 300;

    res.status(201).json({
      message: 'Application details received. Pending payment.',
      applicationId: appRefNumber,
      serviceType: serviceType,
      feeAmount: fee,
      status: 'Awaiting Payment'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing application.' });
  }
};

// Mock payment processing for the application fee
const payApplicationFee = async (req, res) => {
  try {
    const { applicationId } = req.body;
    
    res.status(200).json({
      message: 'Payment Successful. Application is now active.',
      transactionId: 'FEE-TXN-' + Date.now(),
      status: 'Under Review',
      assignedTo: 'Investigating Officer (Verification Dept)'
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed.' });
  }
};

module.exports = { submitApplication, payApplicationFee };