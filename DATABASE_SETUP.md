# Configuración de Vercel Postgres

## Pasos para configurar la base de datos en Vercel

### 1. Crear la base de datos en Vercel
1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Navega a la pestaña **Storage**
3. Haz clic en **Create Database**
4. Selecciona **Postgres** (Serverless SQL)
5. Asigna un nombre a tu base de datos (ej: `mtg-database`)
6. Selecciona la región más cercana a tus usuarios
7. Haz clic en **Create**

### 2. Conectar la base de datos a tu proyecto
1. Una vez creada, Vercel mostrará las variables de entorno
2. Haz clic en **Connect Project** y selecciona tu proyecto `mtg`
3. Las siguientes variables se agregarán automáticamente:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

### 3. Ejecutar el esquema SQL
1. En el dashboard de tu base de datos, ve a la pestaña **Query**
2. Copia el contenido del archivo `database/schema.sql`
3. Pega el SQL en el editor de consultas
4. Haz clic en **Run Query**
5. Esto creará las tablas:
   - `usuarios` (con usuario admin predefinido)
   - `barajas`
   - `cartas_favoritas`
   - `mazo_cartas`

### 4. Verificar el usuario admin
El esquema SQL incluye automáticamente un usuario de prueba:
- **Username:** `admin`
- **Password:** `123`
- **Email:** `admin@mtg.com`
- **Image:** `1`

Puedes verificar que se creó ejecutando:
```sql
SELECT * FROM usuarios WHERE username = 'admin';
```

### 5. Desarrollo local (opcional)
Para desarrollo local, crea un archivo `.env.local` con:
```env
POSTGRES_URL="tu_connection_string_de_vercel"
REACT_APP_BACKEND_URL="http://localhost:3000"
```

### 6. Probar la conexión
1. Despliega tu proyecto en Vercel: `vercel --prod`
2. Visita tu aplicación
3. Intenta hacer login con:
   - Username: `admin`
   - Password: `123`

## Estructura de tablas

### usuarios
- `id` (SERIAL PRIMARY KEY)
- `username` (VARCHAR(50) UNIQUE NOT NULL)
- `email` (VARCHAR(100) UNIQUE NOT NULL)
- `password` (VARCHAR(255) NOT NULL) ⚠️ Sin hash en producción
- `image` (INTEGER DEFAULT 1)
- `created_at` (TIMESTAMP DEFAULT NOW())

### barajas
- `idbarajas` (SERIAL PRIMARY KEY)
- `nombre` (VARCHAR(100) NOT NULL)
- `descripcion` (TEXT)
- `IDusuario` (INTEGER REFERENCES usuarios(id))
- `created_at` (TIMESTAMP DEFAULT NOW())

### cartas_favoritas
- `IDusuario` (INTEGER REFERENCES usuarios(id))
- `IDcarta` (VARCHAR(255) NOT NULL)
- `added_at` (TIMESTAMP DEFAULT NOW())
- UNIQUE(IDusuario, IDcarta)

### mazo_cartas
- `IDmazo` (INTEGER REFERENCES barajas(idbarajas) ON DELETE CASCADE)
- `IDcarta` (VARCHAR(255) NOT NULL)
- `cantidad` (INTEGER DEFAULT 1)
- `added_at` (TIMESTAMP DEFAULT NOW())
- UNIQUE(IDmazo, IDcarta)

## Notas de seguridad
⚠️ **IMPORTANTE:** Este proyecto almacena contraseñas en texto plano. Para producción, debes:
1. Instalar `bcrypt`: `npm install bcrypt`
2. Modificar `api/auth/register.js` para hashear contraseñas
3. Modificar `api/auth/login.js` para comparar hashes
4. Actualizar las contraseñas existentes

## Endpoints de la API
Todos los endpoints están en `/api/`:
- `POST /api/auth/login` - Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `GET /api/usuarios/[userId]` - Obtener perfil
- `PUT /api/usuarios/[userId]` - Actualizar perfil
- `PUT /api/usuarios/password/[userId]` - Cambiar contraseña
- `GET /api/favoritos/[userId]` - Listar favoritos
- `POST /api/favoritos` - Agregar favorito
- `DELETE /api/favoritos/[userId]/[cardId]` - Eliminar favorito
- `GET /api/mazos/[userId]` - Listar mazos del usuario
- `POST /api/mazos` - Crear mazo
- `PUT /api/mazos/[deckId]` - Actualizar mazo
- `DELETE /api/mazos/[deckId]` - Eliminar mazo
- `GET /api/mazos/cartas/[deckId]` - Listar cartas de un mazo
- `POST /api/mazos/cartas` - Agregar carta a mazo
- `DELETE /api/mazos/cartas/[deckId]/[cardId]` - Eliminar carta de mazo
