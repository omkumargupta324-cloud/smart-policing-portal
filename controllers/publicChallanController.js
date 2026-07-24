// Mock search for a citizen's traffic ticket
const searchChallan = async (req, res) => {
  try {
    const { searchQuery } = req.body; // This could be a Vehicle Plate or Challan ID

    // Because the database is off, we are sending back a fake unpaid ticket
    res.status(200).json({
      challanId: 'CHL-' + Math.floor(1000 + Math.random() * 9000),
      vehiclePlate: searchQuery.toUpperCase(),
      violationType: 'Red Light Violation',
      fineAmount: 1000,
      status: 'Unpaid',
      issueDate: new Date().toLocaleDateString()
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching challan details.' });
  }
};

// Mock the UPI/QR payment processing
const processPayment = async (req, res) => {
  try {
    const { challanId } = req.body;
    
    // Generate a fake bank transaction ID
    const transactionId = 'TXN-' + Date.now();

    res.status(200).json({
      message: 'Payment processed successfully.',
      transactionId: transactionId,
      receiptUrl: `/receipts/${transactionId}.pdf` // Mock PDF download link
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed.' });
  }
};

module.exports = { searchChallan, processPayment };