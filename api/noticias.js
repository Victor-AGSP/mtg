const scrapeNoticias = require('../scrapeNoticiass');

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
    const newsItems = await scrapeNoticias();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json(newsItems);
  } catch (error) {
    console.error('Error fetching news from Noticias:', error.message);
    res.status(500).json({ error: 'Error fetching the news', details: error.message });
  }
};
