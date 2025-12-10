import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { deckId, userId } = req.query;

  try {
    if (req.method === 'GET') {
      if (userId) {
        const result = await sql`
          SELECT idbarajas, nombre, descripcion, IDusuario, created_at
          FROM barajas
          WHERE IDusuario = ${userId}
          ORDER BY created_at DESC
        `;
        return res.status(200).json(result.rows);
      }
      return res.status(400).json({ error: 'User ID required' });
    }

    if (req.method === 'POST') {
      const { nombre, descripcion, IDusuario } = req.body;
      if (!nombre || !IDusuario) {
        return res.status(400).json({ error: 'Name and user ID required' });
      }
      const result = await sql`
        INSERT INTO barajas (nombre, descripcion, IDusuario)
        VALUES (${nombre}, ${descripcion || ''}, ${IDusuario})
        RETURNING idbarajas, nombre, descripcion, IDusuario
      `;
      return res.status(201).json({ success: true, deck: result.rows[0] });
    }

    if (req.method === 'PUT') {
      if (!deckId) {
        return res.status(400).json({ error: 'Deck ID required' });
      }
      const { nombre, descripcion } = req.body;
      const result = await sql`
        UPDATE barajas
        SET nombre = ${nombre}, descripcion = ${descripcion || ''}
        WHERE idbarajas = ${deckId}
        RETURNING idbarajas, nombre, descripcion, IDusuario
      `;
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Deck not found' });
      }
      return res.status(200).json({ success: true, deck: result.rows[0] });
    }

    if (req.method === 'DELETE') {
      if (!deckId) {
        return res.status(400).json({ error: 'Deck ID required' });
      }
      await sql`
        DELETE FROM barajas WHERE idbarajas = ${deckId}
      `;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Decks API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
