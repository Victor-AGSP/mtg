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

  const { deckId, cardId } = req.query;

  try {
    if (req.method === 'GET') {
      // Obtener cartas de un mazo
      if (!deckId) {
        return res.status(400).json({ error: 'Deck ID required' });
      }

      const result = await sql`
        SELECT id, IDmazo, IDcarta, cantidad, created_at
        FROM mazo_cartas
        WHERE IDmazo = ${deckId}
        ORDER BY created_at DESC
      `;

      return res.status(200).json(result.rows);

    } else if (req.method === 'POST') {
      // Agregar carta a mazo
      const { IDmazo, IDcarta, cantidad = 1 } = req.body;

      if (!IDmazo || !IDcarta) {
        return res.status(400).json({ error: 'Deck ID and card ID required' });
      }

      // Verificar si la carta ya existe en el mazo
      const existing = await sql`
        SELECT id, cantidad FROM mazo_cartas
        WHERE IDmazo = ${IDmazo} AND IDcarta = ${IDcarta}
      `;

      if (existing.rows.length > 0) {
        // Actualizar cantidad
        await sql`
          UPDATE mazo_cartas
          SET cantidad = cantidad + ${cantidad}
          WHERE IDmazo = ${IDmazo} AND IDcarta = ${IDcarta}
        `;
      } else {
        // Insertar nueva carta
        await sql`
          INSERT INTO mazo_cartas (IDmazo, IDcarta, cantidad)
          VALUES (${IDmazo}, ${IDcarta}, ${cantidad})
        `;
      }

      return res.status(201).json({ success: true });

    } else if (req.method === 'DELETE') {
      // Eliminar carta de mazo
      if (!deckId || !cardId) {
        return res.status(400).json({ error: 'Deck ID and card ID required' });
      }

      await sql`
        DELETE FROM mazo_cartas
        WHERE IDmazo = ${deckId} AND IDcarta = ${cardId}
      `;

      return res.status(200).json({ success: true });

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Deck cards API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
