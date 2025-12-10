import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const action = req.query.action || req.body.action;

  try {
    if (action === 'login') {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
      }

      const result = await sql`
        SELECT id, username, email, image 
        FROM usuarios 
        WHERE username = ${username} AND password = ${password}
      `;

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = result.rows[0];
      return res.status(200).json({
        success: true,
        userId: user.id,
        username: user.username,
        email: user.email,
        image: user.image,
      });
    }

    if (action === 'register') {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password required' });
      }

      try {
        const result = await sql`
          INSERT INTO usuarios (username, email, password, image)
          VALUES (${username}, ${email}, ${password}, 1)
          RETURNING id, username, email, image
        `;

        const user = result.rows[0];
        return res.status(201).json({
          success: true,
          userId: user.id,
          username: user.username,
          email: user.email,
          image: user.image,
        });
      } catch (err) {
        if (err.message.includes('duplicate')) {
          return res.status(409).json({ error: 'Username or email already exists' });
        }
        throw err;
      }
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('Auth API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
