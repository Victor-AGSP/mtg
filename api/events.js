const scrapeEvents = require('../scrapeEventss');

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const events = await scrapeEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching the events:', error.message);
    res.status(500).json({ error: 'Error fetching the events', details: error.message });
  }
};
