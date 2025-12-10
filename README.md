# Magic: The Gathering - Proyecto Web

Proyecto web de Magic: The Gathering con noticias, eventos y sistema de gestión de mazos.

## 🚀 Deployment en Vercel

**Ver guía completa:** [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)

Este proyecto está configurado para deployment en Vercel con funciones serverless.

## 📋 Características

- ✅ Noticias de Magic: The Gathering (scraping de magic.wizards.com)
- ✅ Eventos próximos (scraping de magic.gg)
- ✅ Noticias de Meristation e IGN
- ✅ Sistema de gestión de mazos
- ✅ Búsqueda de cartas
- ✅ Sistema de favoritos
- ✅ Integración con Scryfall API

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de entorno
cp .env.example .env.local
```

## 🏃‍♂️ Ejecución en desarrollo

### Opción 1: Con servidor de scraping local (desarrollo completo)

```bash
# Terminal 1 - Servidor de scraping
npm run server

# Terminal 2 - Aplicación React
npm start
```

### Opción 2: Solo React (sin scraping local)

```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## 📦 Scripts disponibles

### `npm start`

Ejecuta la aplicación React en modo desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### `npm run server`

Ejecuta el servidor de scraping en [http://localhost:3003](http://localhost:3003).\
APIs disponibles:
- `/api/news` - Noticias de Magic
- `/api/events` - Eventos próximos
- `/api/noticias` - Noticias de Meristation e IGN

### `npm run build`

Crea un build de producción en la carpeta `build/`.

### `npm test`

Ejecuta los tests en modo interactivo.

## 🌐 Estructura del proyecto

```
proyecto/
├── api/                    # Funciones serverless para Vercel
│   ├── news.js
│   ├── events.js
│   └── noticias.js
├── public/                 # Archivos públicos
├── src/
│   ├── components/         # Componentes React
│   ├── config/
│   │   └── api.js         # Configuración de URLs de API
│   ├── fetchs/            # Funciones de fetch
│   ├── images/            # Imágenes del proyecto
│   └── info/              # Datos estáticos
├── scrapeNewss.js         # Script de scraping de noticias
├── scrapeEventss.js       # Script de scraping de eventos
├── scrapeNoticiass.js     # Script de scraping de noticias adicionales
├── servers.js             # Servidor Express (desarrollo local)
└── vercel.json            # Configuración de Vercel

```

## 🔧 Tecnologías utilizadas

- **Frontend**: React 18, React Router, Tailwind CSS
- **APIs**: Axios, Fetch API
- **Scraping**: Cheerio, Axios
- **Backend**: Express.js (desarrollo), Vercel Serverless Functions (producción)
- **Deployment**: Vercel
- **External APIs**: Scryfall API, Google Maps API

## 📝 Variables de entorno

Crea un archivo `.env.local` basado en `.env.example`:

```env
REACT_APP_API_URL=http://localhost:3003
```

En producción (Vercel), esta variable se configura automáticamente.

## 🚀 Deploy a Vercel

Ver la guía completa en [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)

**Resumen rápido:**

1. Conecta tu repositorio de GitHub con Vercel
2. Vercel detectará automáticamente la configuración
3. Deploy automático en cada push a main

## 📚 Documentación adicional

- [Instrucciones de ejecución local](./INSTRUCCIONES.md)
- [Guía de deployment en Vercel](./DEPLOY_VERCEL.md)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y de uso educativo.

---

## Learn More

Ejecuta los tests en modo interactivo.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
