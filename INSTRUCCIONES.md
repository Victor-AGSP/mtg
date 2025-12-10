# Instrucciones para ejecutar el proyecto

## Problema resuelto
Se corrigieron los errores de CORS y las rutas incorrectas de las APIs.

## Cambios realizados

### 1. Servidor de Scraping (servers.js)
- ✅ Corregidas las rutas de importación de los scrapers
- ✅ Puerto configurado en 3003
- ✅ CORS habilitado
- ✅ Mensajes de consola informativos

### 2. Componentes React
Se actualizaron las URLs en los siguientes componentes:
- ✅ **Hero.jsx**: `http://localhost:3003/api/news`
- ✅ **News.jsx**: `http://localhost:3003/api/news`
- ✅ **Events.jsx**: `http://localhost:3003/api/events`
- ✅ **Noticias.jsx**: `http://localhost:3003/api/noticias`

### 3. Archivos de Scraping
- ✅ **scrapeNewss.js**: Corregido conflicto de merge
- ✅ **scrapeEventss.js**: Funcionando correctamente
- ✅ **scrapeNoticiass.js**: Funcionando correctamente

## Cómo ejecutar el proyecto

### Opción 1: Usar dos terminales (RECOMENDADO)

**Terminal 1 - Servidor de Scraping:**
```bash
cd c:\Users\HP\Documents\victor\integracion-II\proyecto
npm run server
```

**Terminal 2 - Aplicación React:**
```bash
cd c:\Users\HP\Documents\victor\integracion-II\proyecto
npm start
```

### Opción 2: Usar comandos individuales

**Iniciar servidor de scraping:**
```bash
node servers.js
```

**Iniciar aplicación React (en otra terminal):**
```bash
npm start
```

## Verificar que funciona

1. El servidor de scraping debe mostrar:
   ```
   Servidor de scraping corriendo en http://localhost:3003
   APIs disponibles:
     - http://localhost:3003/api/news
     - http://localhost:3003/api/events
     - http://localhost:3003/api/noticias
   ```

2. La aplicación React se abrirá en `http://localhost:3000`

3. Verifica que las noticias, eventos y noticias aparezcan en tu página sin errores de CORS

## APIs disponibles

- **GET** `http://localhost:3003/api/news` - Obtiene noticias de Magic: The Gathering
- **GET** `http://localhost:3003/api/events` - Obtiene eventos próximos
- **GET** `http://localhost:3003/api/noticias` - Obtiene noticias de Meristation e IGN

## Notas importantes

- ⚠️ **Siempre ejecuta el servidor de scraping PRIMERO** antes de iniciar la aplicación React
- ⚠️ Ambos servidores deben estar corriendo al mismo tiempo
- ⚠️ No cierres las terminales mientras uses la aplicación
- Si cambias código del servidor, debes reiniciarlo (Ctrl+C y volver a ejecutar)
