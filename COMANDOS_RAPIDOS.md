# 🚀 Comandos Rápidos para Deployment

## 📦 Preparación inicial

```bash
# 1. Ir al proyecto
cd c:\Users\HP\Documents\victor\integracion-II\proyecto

# 2. Verificar que todo esté listo
npm run verify

# 3. Probar build local
npm run build
```

## 🌐 Opción 1: Deploy con GitHub + Vercel (Recomendado)

```bash
# Inicializar repositorio (si no existe)
git init

# Agregar archivos
git add .

# Commit
git commit -m "Proyecto listo para Vercel"

# Crear rama main
git branch -M main

# Conectar con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# Subir código
git push -u origin main
```

**Luego en Vercel:**
1. Ve a [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Importa tu repositorio
4. Click "Deploy"

## 🔧 Opción 2: Deploy con Vercel CLI

```bash
# Instalar Vercel CLI (solo primera vez)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 🧪 Desarrollo local

```bash
# Terminal 1: Servidor de scraping
npm run server

# Terminal 2: React app
npm start
```

## 📝 Comandos útiles

```bash
# Verificar configuración
npm run verify

# Build de producción
npm run build

# Ejecutar tests
npm test

# Servidor de desarrollo
npm start

# Servidor de scraping
npm run server
```

## 🔄 Workflow típico

```bash
# 1. Hacer cambios en el código
# 2. Probar localmente
npm start

# 3. Verificar antes de subir
npm run verify
npm run build

# 4. Commit y push
git add .
git commit -m "Descripción de cambios"
git push

# 5. Vercel hace deploy automático
```

## 📍 URLs después del deploy

```
Aplicación:  https://tu-proyecto.vercel.app
API News:    https://tu-proyecto.vercel.app/api/news
API Events:  https://tu-proyecto.vercel.app/api/events
API Noticias: https://tu-proyecto.vercel.app/api/noticias
```

## 🎯 Deploy en un solo comando (después de configurar)

```bash
git add . && git commit -m "Update" && git push
```

Vercel hace el resto automáticamente. 🎉
