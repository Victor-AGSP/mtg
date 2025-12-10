import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { userId, cardId } = req.query;

  try {
    if (req.method === 'GET') {
      // Obtener favoritos de un usuario
      if (!userId) {
        return res.status(400).json({ error: 'User ID required' });
      }

      const result = await sql`
        SELECT IDcarta, IDusuario, created_at
        FROM cartas_favoritas
        WHERE IDusuario = ${userId}
        ORDER BY created_at DESC
      `;

      return res.status(200).json(result.rows);

    } else if (req.method === 'POST') {
      // Agregar favorito
      const { IDusuario, IDcarta } = req.body;

      if (!IDusuario || !IDcarta) {
        return res.status(400).json({ error: 'User ID and card ID required' });
      }

      await sql`
        INSERT INTO cartas_favoritas (IDusuario, IDcarta)
        VALUES (${IDusuario}, ${IDcarta})
        ON CONFLICT (IDusuario, IDcarta) DO NOTHING
      `;

      return res.status(201).json({ success: true });

    } else if (req.method === 'DELETE') {
      // Eliminar favorito
      if (!userId || !cardId) {
        return res.status(400).json({ error: 'User ID and card ID required' });
      }

      await sql`
        DELETE FROM cartas_favoritas
        WHERE IDusuario = ${userId} AND IDcarta = ${cardId}
      `;

      return res.status(200).json({ success: true });

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Favorites API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
