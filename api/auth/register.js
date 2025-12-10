import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // CORS headers
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

  try {
    const { username, email, password, image = 1 } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email and password required' });
    }

    // Verificar si el usuario ya existe
    const existing = await sql`
      SELECT id FROM usuarios WHERE username = ${username} OR email = ${email}
    `;

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Crear usuario (en producción usar bcrypt para password)
    const result = await sql`
      INSERT INTO usuarios (username, email, password, image)
      VALUES (${username}, ${email}, ${password}, ${image})
      RETURNING id, username, email, image
    `;

    const user = result.rows[0];
    
    return res.status(201).json({
      success: true,
      userId: user.id,
      username: user.username,
      email: user.email,
      image: user.image
    });

  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
