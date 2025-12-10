-- Esquema de base de datos para MTG App
-- Ejecutar en Vercel Postgres Dashboard

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  image INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de barajas/mazos
CREATE TABLE IF NOT EXISTS barajas (
  idbarajas SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  IDusuario INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de cartas favoritas
CREATE TABLE IF NOT EXISTS cartas_favoritas (
  id SERIAL PRIMARY KEY,
  IDusuario INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  IDcarta VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(IDusuario, IDcarta)
);

-- Tabla de cartas en mazos
CREATE TABLE IF NOT EXISTS mazo_cartas (
  id SERIAL PRIMARY KEY,
  IDmazo INTEGER REFERENCES barajas(idbarajas) ON DELETE CASCADE,
  IDcarta VARCHAR(255) NOT NULL,
  cantidad INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(IDmazo, IDcarta)
);

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_barajas_usuario ON barajas(IDusuario);
CREATE INDEX idx_favoritas_usuario ON cartas_favoritas(IDusuario);
CREATE INDEX idx_mazo_cartas_mazo ON mazo_cartas(IDmazo);

-- Insertar usuario admin (password: 123 - en producción usar bcrypt)
INSERT INTO usuarios (username, email, password, image) 
VALUES ('admin', 'admin@mtg.com', '123', 1)
ON CONFLICT (username) DO NOTHING;
