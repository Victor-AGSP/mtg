// Configuración del backend API
// En desarrollo usa la URL de Vercel o localhost
// En producción usa window.location.origin (automático en Vercel)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || (typeof window !== 'undefined' ? window.location.origin : '');

export const BACKEND_ENDPOINTS = {
  // Auth
  login: `${BACKEND_URL}/api/auth?action=login`,
  register: `${BACKEND_URL}/api/auth?action=register`,
  
  // Usuario
  getUser: (userId) => `${BACKEND_URL}/api/usuarios/${userId}`,
  updateUser: (userId) => `${BACKEND_URL}/api/usuarios/${userId}`,
  updatePassword: (userId) => `${BACKEND_URL}/api/usuarios/password/${userId}`,
  
  // Favoritos
  getFavorites: (userId) => `${BACKEND_URL}/api/favoritos?userId=${userId}`,
  addFavorite: `${BACKEND_URL}/api/favoritos`,
  deleteFavorite: (userId, cardId) => `${BACKEND_URL}/api/favoritos?userId=${userId}&cardId=${cardId}`,
  
  // Mazos
  getDecks: (userId) => `${BACKEND_URL}/api/mazos?userId=${userId}`,
  createDeck: `${BACKEND_URL}/api/mazos`,
  updateDeck: (deckId) => `${BACKEND_URL}/api/mazos?deckId=${deckId}`,
  deleteDeck: (deckId) => `${BACKEND_URL}/api/mazos?deckId=${deckId}`,
  
  // Cartas en mazos
  getDeckCards: (deckId) => `${BACKEND_URL}/api/mazos/cartas?deckId=${deckId}`,
  addCardToDeck: `${BACKEND_URL}/api/mazos/cartas`,
  deleteCardFromDeck: (deckId, cardId) => `${BACKEND_URL}/api/mazos/cartas?deckId=${deckId}&cardId=${cardId}`,
};

export default BACKEND_URL;
