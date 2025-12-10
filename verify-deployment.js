#!/usr/bin/env node

/**
 * Script de verificación pre-deployment
 * Verifica que todo esté listo antes de subir a Vercel
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración para Vercel...\n');

let errors = 0;
let warnings = 0;

// Verificar archivos necesarios
const requiredFiles = [
  'vercel.json',
  'package.json',
  'api/news.js',
  'api/events.js',
  'api/noticias.js',
  'scrapeNewss.js',
  'scrapeEventss.js',
  'scrapeNoticiass.js',
  'src/config/api.js'
];

console.log('📁 Verificando archivos necesarios...');
requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - FALTA`);
    errors++;
  }
});

// Verificar .gitignore
console.log('\n📝 Verificando .gitignore...');
if (fs.existsSync(path.join(__dirname, '.gitignore'))) {
  const gitignore = fs.readFileSync(path.join(__dirname, '.gitignore'), 'utf8');
  if (gitignore.includes('.env.local')) {
    console.log('  ✅ .env.local está en .gitignore');
  } else {
    console.log('  ⚠️  .env.local NO está en .gitignore');
    warnings++;
  }
  if (gitignore.includes('node_modules')) {
    console.log('  ✅ node_modules está en .gitignore');
  } else {
    console.log('  ❌ node_modules NO está en .gitignore');
    errors++;
  }
} else {
  console.log('  ❌ .gitignore no existe');
  errors++;
}

// Verificar vercel.json
console.log('\n⚙️  Verificando vercel.json...');
try {
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8'));
  console.log('  ✅ vercel.json es JSON válido');
  
  if (vercelConfig.builds) {
    console.log('  ✅ Builds configurados');
  }
  
  if (vercelConfig.routes || vercelConfig.rewrites) {
    console.log('  ✅ Routes/Rewrites configurados');
  }
} catch (e) {
  console.log('  ❌ Error en vercel.json:', e.message);
  errors++;
}

// Verificar package.json
console.log('\n📦 Verificando package.json...');
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  if (pkg.dependencies && pkg.dependencies['axios']) {
    console.log('  ✅ axios instalado');
  } else {
    console.log('  ❌ axios no está en dependencias');
    errors++;
  }
  
  if (pkg.dependencies && pkg.dependencies['cheerio']) {
    console.log('  ✅ cheerio instalado');
  } else {
    console.log('  ❌ cheerio no está en dependencias');
    errors++;
  }
  
  if (pkg.dependencies && pkg.dependencies['react']) {
    console.log('  ✅ react instalado');
  }
  
  if (pkg.scripts && pkg.scripts['build']) {
    console.log('  ✅ Script de build existe');
  } else {
    console.log('  ❌ Script de build no existe');
    errors++;
  }
} catch (e) {
  console.log('  ❌ Error en package.json:', e.message);
  errors++;
}

// Resumen
console.log('\n' + '='.repeat(50));
console.log('📊 Resumen de verificación\n');
console.log(`  Errores: ${errors}`);
console.log(`  Advertencias: ${warnings}`);

if (errors === 0 && warnings === 0) {
  console.log('\n✅ ¡Todo listo para deployment en Vercel!');
  console.log('\n📌 Próximos pasos:');
  console.log('  1. git add .');
  console.log('  2. git commit -m "Configuración para Vercel"');
  console.log('  3. git push');
  console.log('  4. Conecta tu repo en vercel.com');
  console.log('\nO usa: vercel --prod');
} else if (errors === 0) {
  console.log('\n⚠️  Hay algunas advertencias, pero puedes continuar');
  console.log('Revisa las advertencias arriba antes de deployar');
} else {
  console.log('\n❌ Hay errores que debes corregir antes de deployar');
  console.log('Revisa los errores marcados arriba');
  process.exit(1);
}

console.log('='.repeat(50) + '\n');
