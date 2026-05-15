#!/usr/bin/env node

/**
 * Script para consultar The Movie Database (TMDB) API
 * Lee la API_KEY del archivo .env y ejecuta búsquedas
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuración
const DEFAULT_ENV_PATH = '.env';
const TMDB_API_BASE = 'https://api.themoviedb.org/3';

/**
 * Lee la API_KEY del archivo .env
 */
function getApiKey(envPath = DEFAULT_ENV_PATH) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/API_KEY\s*=\s*(.+)/);

    if (!match || !match[1]) {
      throw new Error('API_KEY no encontrada en .env');
    }

    return match[1].trim();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Realiza una consulta HTTP a la API de TMDB
 */
function queryTMDB(apiKey, searchType, query, page = 1) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      api_key: apiKey,
      query: query,
      page: page
    });

    const url = `${TMDB_API_BASE}/search/${searchType}?${params}`;

    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(new Error('Error al parsear respuesta JSON'));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Formatea y muestra los resultados
 */
function formatResults(results, searchType) {
  if (!results.results || results.results.length === 0) {
    console.log('❌ No se encontraron resultados.');
    return;
  }

  console.log(
    `\n✅ Resultados encontrados: ${results.total_results} (Página ${results.page}/${results.total_pages})\n`
  );

  results.results.forEach((item, index) => {
    const title = item.title || item.name;
    const releaseDate = item.release_date || item.first_air_date || 'N/A';
    const rating = item.vote_average || 0;
    const popularity = item.popularity || 0;
    const overview = item.overview
      ? item.overview.substring(0, 150) + '...'
      : 'Sin descripción';

    console.log(`┌─────────────────────────────────────────`);
    console.log(`│ ${index + 1}. ${title}`);
    console.log(`├─ ID: ${item.id}`);
    console.log(`├─ Fecha: ${releaseDate}`);
    console.log(`├─ Rating: ⭐ ${rating}/10`);
    console.log(`├─ Popularidad: ${popularity.toFixed(2)}`);
    console.log(`├─ Sinopsis: ${overview}`);
    console.log(`└─────────────────────────────────────────`);
  });
}

/**
 * Muestra el uso del script
 */
function showHelp() {
  console.log(`
📺 The Movie Database (TMDB) Query Script
══════════════════════════════════════════

Uso: node query-tmdb.js [opciones]

Opciones:
  -q, --query <término>    Término de búsqueda (requerido)
  -t, --type <tipo>        Tipo de búsqueda: 'movie' o 'tv' (default: 'movie')
  -p, --page <número>      Número de página (default: 1)
  --env <ruta>             Ruta al archivo .env (default: '.env')
  -h, --help               Muestra esta ayuda

Ejemplos:
  node query-tmdb.js -q "The Matrix"
  node query-tmdb.js -q "Breaking Bad" -t tv
  node query-tmdb.js -q "Inception" -p 2 --env /ruta/a/.env

Notas:
  - El archivo .env debe contener: API_KEY=<tu_api_key>
  - Requiere Node.js v14 o superior
  - La API de TMDB es gratuita (https://www.themoviedb.org/settings/api)
`);
}

/**
 * Parsea argumentos de línea de comandos
 */
function parseArgs(args) {
  const options = {
    query: null,
    type: 'movie',
    page: 1,
    env: DEFAULT_ENV_PATH,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '-q':
      case '--query':
        options.query = args[++i];
        break;
      case '-t':
      case '--type':
        options.type = args[++i];
        break;
      case '-p':
      case '--page':
        options.page = parseInt(args[++i], 10);
        break;
      case '--env':
        options.env = args[++i];
        break;
      case '-h':
      case '--help':
        options.help = true;
        break;
    }
  }

  return options;
}

/**
 * Main
 */
async function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  if (options.help || args.length === 0) {
    showHelp();
    process.exit(options.help ? 0 : 1);
  }

  if (!options.query) {
    console.error('❌ Error: --query es requerido');
    showHelp();
    process.exit(1);
  }

  try {
    const apiKey = getApiKey(options.env);
    console.log(`🔍 Buscando: "${options.query}" (tipo: ${options.type}, página: ${options.page})...`);

    const results = await queryTMDB(apiKey, options.type, options.query, options.page);
    formatResults(results, options.type);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
