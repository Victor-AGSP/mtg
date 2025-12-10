const express = require('express');
const scrapeNews = require('./scrapeNewss');
const scrapeEvents = require('./scrapeEventss');
const scrapeNoticias = require('./scrapeNoticiass');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3003;

app.use(cors());

// Ruta principal para verificar que el servidor esté funcionando
app.get('/', (req, res) => {
  res.json({ message: 'API de scraping funcionando correctamente' });
});

// Ruta para obtener noticias
app.get('/api/news', async (req, res) => {
  try {
    const newsItems = await scrapeNews();
    res.json(newsItems);
  } catch (error) {
    console.error('Error fetching the news:', error.message);
    res.status(500).send('Error fetching the news');
  }
});

// Ruta para obtener eventos
app.get('/api/events', async (req, res) => {
  try {
    const events = await scrapeEvents();
    res.json(events);
  } catch (error) {
    console.error('Error fetching the events:', error.message);
    res.status(500).send('Error fetching the events');
  }
});

// Ruta para obtener noticias
app.get('/api/noticias', async (req, res) => {
  try {
    const newsItems = await scrapeNoticias(); // Usamos scrapeNoticias aquí
    res.setHeader('Content-Type', 'application/json; charset=utf-8'); // Establecer el tipo de contenido
    res.json(newsItems);
  } catch (error) {
    console.error('Error fetching news from Noticias:', error.message);
    res.status(500).send('Error fetching the news');
  }
});

app.listen(port, () => {
  console.log(`Servidor de scraping corriendo en http://localhost:${port}`);
  console.log(`APIs disponibles:`);
  console.log(`  - http://localhost:${port}/api/news`);
  console.log(`  - http://localhost:${port}/api/events`);
  console.log(`  - http://localhost:${port}/api/noticias`);
});
