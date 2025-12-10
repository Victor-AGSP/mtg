// Configuración de URLs de API
// En desarrollo usa localhost, en producción usa la URL de Vercel
const API_BASE_URL = process.env.REACT_APP_API_URL || window.location.origin;

export const API_ENDPOINTS = {
  news: `${API_BASE_URL}/api/news`,
  events: `${API_BASE_URL}/api/events`,
  noticias: `${API_BASE_URL}/api/noticias`,
};

export default API_BASE_URL;
