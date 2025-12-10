# 🚀 Guía de Deployment en Vercel

## 📋 Preparativos completados

✅ Funciones serverless creadas en `/api`
✅ Configuración de Vercel (`vercel.json`)
✅ Variables de entorno configuradas
✅ Componentes actualizados para usar URLs dinámicas

## 🔧 Estructura de archivos para Vercel

```
proyecto/
├── api/                    # ← Funciones serverless
│   ├── news.js            # GET /api/news
│   ├── events.js          # GET /api/events
│   └── noticias.js        # GET /api/noticias
├── src/
│   ├── config/
│   │   └── api.js         # ← Configuración centralizada de APIs
│   └── components/
├── scrapeNewss.js         # ← Scripts de scraping (usados por /api)
├── scrapeEventss.js
├── scrapeNoticiass.js
├── vercel.json            # ← Configuración de Vercel
└── package.json
```

## 📝 Pasos para subir a Vercel

### 1. Instalar Vercel CLI (opcional pero recomendado)

```bash
npm install -g vercel
```

### 2. Iniciar sesión en Vercel

```bash
vercel login
```

### 3. Deploy desde la línea de comandos

**Opción A - Deploy rápido (preview):**
```bash
cd c:\Users\HP\Documents\victor\integracion-II\proyecto
vercel
```

**Opción B - Deploy a producción:**
```bash
cd c:\Users\HP\Documents\victor\integracion-II\proyecto
vercel --prod
```

### 4. Deploy desde GitHub (Recomendado)

1. **Sube tu código a GitHub:**
   ```bash
   cd c:\Users\HP\Documents\victor\integracion-II\proyecto
   git init
   git add .
   git commit -m "Configuración para Vercel"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto React
   - Click en "Deploy"

3. **Configurar variables de entorno (opcional):**
   - En el dashboard de Vercel, ve a tu proyecto
   - Settings → Environment Variables
   - Agrega: `REACT_APP_API_URL` con valor de tu URL de Vercel (ejemplo: `https://tu-proyecto.vercel.app`)

## 🌐 Cómo funcionará en producción

### URLs de las APIs en producción:
- `https://tu-proyecto.vercel.app/api/news`
- `https://tu-proyecto.vercel.app/api/events`
- `https://tu-proyecto.vercel.app/api/noticias`

### Diferencias entre desarrollo y producción:

| Entorno | URL Base |
|---------|----------|
| **Desarrollo** | `http://localhost:3003` |
| **Producción** | `https://tu-proyecto.vercel.app` |

El código detecta automáticamente el entorno y usa la URL correcta.

## ⚙️ Configuración automática

El archivo `src/config/api.js` maneja automáticamente las URLs:

```javascript
// En desarrollo: usa REACT_APP_API_URL (.env.local)
// En producción: usa window.location.origin (tu dominio de Vercel)
const API_BASE_URL = process.env.REACT_APP_API_URL || window.location.origin;
```

## 🧪 Probar localmente antes de subir

```bash
# Terminal 1 - Servidor de desarrollo (para desarrollo local)
npm run server

# Terminal 2 - Aplicación React
npm start
```

## 🔍 Verificar después del deployment

1. **Verifica que el build fue exitoso:**
   - En el dashboard de Vercel verás "Deployment Successful"

2. **Prueba las APIs directamente:**
   ```
   https://tu-proyecto.vercel.app/api/news
   https://tu-proyecto.vercel.app/api/events
   https://tu-proyecto.vercel.app/api/noticias
   ```

3. **Revisa los logs:**
   - En Vercel dashboard → Tu proyecto → Functions
   - Puedes ver los logs de cada función serverless

## ⚠️ Notas importantes

### Límites de Vercel (Plan gratuito):
- ✅ Funciones serverless: 10 segundos de tiempo de ejecución
- ✅ Bandwidth: 100GB/mes
- ✅ Invocaciones: 100GB-hours

### Web Scraping en producción:
- ⚠️ El scraping puede ser lento en la primera llamada (cold start)
- ⚠️ Las funciones serverless tienen timeout de 10 segundos (gratis) o 60 segundos (pro)
- ⚠️ Considera cachear los resultados si es necesario

### Alternativas si el scraping es muy lento:
1. Usar un cron job para actualizar datos periódicamente
2. Cachear resultados en memoria o en una base de datos
3. Migrar el scraping a un servicio dedicado

## 🆘 Solución de problemas

### Error: "Function Execution Timeout"
- Las funciones de scraping tardan más de 10 segundos
- **Solución**: Optimiza el scraping o actualiza a Vercel Pro

### Error: "Module not found"
- Verifica que todos los `require()` usen rutas relativas correctas
- Asegúrate de que `package.json` incluye todas las dependencias

### Error: CORS
- Ya está configurado en las funciones serverless
- Si persiste, verifica los headers en `/api/*.js`

## 📚 Recursos adicionales

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Deploy React Apps](https://vercel.com/guides/deploying-react-with-vercel)

---

## ✅ Checklist antes del deployment

- [ ] Código subido a GitHub
- [ ] Archivo `vercel.json` en la raíz del proyecto
- [ ] Carpeta `/api` con las funciones serverless
- [ ] `.env.local` en `.gitignore` (no subir a GitHub)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Build funciona localmente (`npm run build`)
- [ ] Conectar repositorio con Vercel
- [ ] Deploy y verificar

¡Tu proyecto estará listo para producción! 🎉
