// Fetch department performance statistics
const getPublicStats = async (req, res) => {
  try {
    // Mocking real-time analytical data
    const stats = {
      avgResponseTime: '4.2 Mins',
      activeCases: 142,
      challansCollected: '₹12.4L',
      firResolvedThisMonth: 89,
      policeMitraVolunteers: 340
    };
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public stats.' });
  }
};

// Fetch official department notices (Tenders, RTI, Recruitment)
const getPublicNotices = async (req, res) => {
  try {
    const notices = [
      { id: 'TND-01', type: 'Tender', title: 'Procurement of New PCR Vans', date: '2026-07-20' },
      { id: 'REC-04', type: 'Recruitment', title: 'Sub-Inspector Physical Test Schedule', date: '2026-07-22' },
      { id: 'RTI-99', type: 'RTI', title: 'Q2 2026 Annual Budget Disclosure', date: '2026-07-23' },
      { id: 'TND-02', type: 'Tender', title: 'Upgradation of Station CCTV Grid', date: '2026-07-24' }
    ];
    res.status(200).json(notices);
  } catch(error) {
    res.status(500).json({ message: 'Error fetching notices.' });
  }
};

module.exports = { getPublicStats, getPublicNotices };