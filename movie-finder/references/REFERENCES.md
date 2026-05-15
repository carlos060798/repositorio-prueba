# 📚 Movie Finder - Referencias Técnicas

Información técnica y referencias de la API para el script de búsqueda de películas.

---

## 🔗 Endpoints TMDB Utilizados

### Search Movie
```
GET https://api.themoviedb.org/3/search/movie
```
Busca películas por nombre o término de búsqueda.

**Parámetros:**
- `api_key` (string, requerido): Tu clave API de TMDB
- `query` (string, requerido): Término de búsqueda
- `page` (int, opcional): Número de página (default: 1)
- `include_adult` (boolean, opcional): Incluir contenido adulto

**Respuesta Exitosa (200):**
```json
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/...",
      "genre_ids": [28, 12, 878],
      "id": 603,
      "original_language": "en",
      "original_title": "The Matrix",
      "overview": "Set in the future...",
      "popularity": 84.235,
      "poster_path": "/...",
      "release_date": "1999-03-30",
      "title": "The Matrix",
      "video": false,
      "vote_average": 8.2,
      "vote_count": 26234
    }
  ],
  "total_pages": 485,
  "total_results": 9683
}
```

### Search TV
```
GET https://api.themoviedb.org/3/search/tv
```
Busca series de TV por nombre.

**Parámetros:** Similares a search/movie

**Respuesta Exitosa (200):**
```json
{
  "page": 1,
  "results": [
    {
      "backdrop_path": "/...",
      "first_air_date": "2008-01-20",
      "genre_ids": [18, 80],
      "id": 1396,
      "name": "Breaking Bad",
      "origin_country": ["US"],
      "original_language": "en",
      "original_name": "Breaking Bad",
      "overview": "When an undercover cop...",
      "popularity": 494.262,
      "poster_path": "/...",
      "vote_average": 9.5,
      "vote_count": 13507
    }
  ],
  "total_pages": 154,
  "total_results": 3073
}
```

---

## 🔑 Obtener API Key

### Pasos para registrarse y obtener API Key:

1. **Crear cuenta en TMDB**
   - URL: https://www.themoviedb.org/signup
   - Verifica tu correo electrónico

2. **Acceder a API Settings**
   - URL: https://www.themoviedb.org/settings/api
   - Necesitas estar autenticado

3. **Solicitar una API Key**
   - Haz clic en "Create"
   - Acepta los términos de uso
   - Completa la solicitud con tus datos

4. **Copiar tu API Key**
   - La API key aparecerá en la página
   - Guárdala de forma segura en tu archivo `.env`

### Tipos de API Keys en TMDB:

- **API Key (v3 auth)**: Para autenticación simple (usada en este script)
- **Bearer Token (v4 auth)**: Para autenticación más avanzada
- **Access Token**: Para OAuth

---

## 📊 Estructura del Archivo `.env`

```env
# The Movie Database API Key
API_KEY=tu_api_key_de_tmdb_aqui

# Opcional: Otras configuraciones
TMDB_API_VERSION=3
TMDB_BASE_URL=https://api.themoviedb.org/3
```

### Seguridad del `.env`:

⚠️ **IMPORTANTE**:
- NUNCA commits el archivo `.env` a git
- Añade `.env` a tu `.gitignore`
- No compartas tu API_KEY con otros
- Si comprometes tu clave, regenera en TMDB

**.gitignore:**
```
.env
.env.local
.env.*.local
```

---

## 🌐 Límites de Uso (Rate Limiting)

La API de TMDB tiene los siguientes límites:

- **Free Tier**: 40 requests / 10 segundos
- **Rate Limit**: Global, no por usuario
- **Error 429**: Too Many Requests (espera unos minutos)

### Manejo de Rate Limiting:

Cuando recibas error 429:
```json
{
  "status_code": 429,
  "status_message": "Your request count (251) is over the allowed limit of (40)."
}
```

**Solución**: Espera 10-30 segundos antes de hacer más requests.

---

## 🔐 Autenticación

### Método: API Key (v3)

Los scripts utilizan autenticación por query parameter:

```
GET /3/search/movie?api_key=YOUR_API_KEY&query=The%20Matrix
```

**Características:**
- ✅ Simple de usar
- ✅ Ideal para scripts y desarrollo local
- ❌ Menos seguro que Bearer tokens
- ❌ Se ve en logs y URLs

### Alternativa: Bearer Token (v4)

Para mayor seguridad en producción:
```
GET /4/search/movie?query=The%20Matrix
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 📦 Campos de Respuesta

### Película (Movie)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | int | ID único de la película |
| `title` | string | Título en idioma original |
| `original_title` | string | Título original |
| `overview` | string | Sinopsis |
| `release_date` | string | Fecha de lanzamiento (YYYY-MM-DD) |
| `popularity` | float | Índice de popularidad |
| `vote_average` | float | Puntuación promedio (0-10) |
| `vote_count` | int | Número de votos |
| `poster_path` | string | URL relativa del póster |
| `backdrop_path` | string | URL relativa del fondo |
| `genre_ids` | array | IDs de géneros |
| `adult` | boolean | Contenido adulto |

### Serie de TV (TV)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | int | ID único de la serie |
| `name` | string | Nombre de la serie |
| `original_name` | string | Nombre original |
| `overview` | string | Sinopsis |
| `first_air_date` | string | Fecha del primer episodio |
| `popularity` | float | Índice de popularidad |
| `vote_average` | float | Puntuación promedio |
| `origin_country` | array | Países de origen |
| `original_language` | string | Idioma original |

---

## 🛠️ Detalles de Implementación

### PowerShell Script (`query-tmdb.ps1`)

**Dependencias:**
- Cmdlet: `Invoke-RestMethod` (incluido en PowerShell)
- No requiere librerías externas

**Función Principal:**
```powershell
Invoke-TMDBQuery -ApiKey $key -Query $term -SearchType $type -Page $page
```

**Características:**
- ✅ Parseo automático de JSON
- ✅ Manejo de errores integrado
- ✅ Salida formateada
- ✅ Compatible con PowerShell 5.0+

### Node.js Script (`query-tmdb.js`)

**Dependencias:**
- `https` (módulo nativo de Node.js)
- No requiere npm install

**Función Principal:**
```javascript
queryTMDB(apiKey, searchType, query, page)
```

**Características:**
- ✅ Completamente async/await
- ✅ Manejo de errores robusto
- ✅ CLI con argumentos parseados
- ✅ Compatible con Node v14+

---

## 🐛 Códigos de Error Comunes

| Código | Mensaje | Solución |
|--------|---------|----------|
| 401 | Unauthorized | Verifica tu API_KEY |
| 404 | Not Found | El endpoint o recurso no existe |
| 429 | Too Many Requests | Espera 10+ segundos |
| 500 | Internal Server Error | Problema en TMDB, intenta después |
| -1 | Network Error | Verifica conexión a internet |

---

## 📖 Documentación Oficial

- **API Documentation**: https://developer.themoviedb.org/docs
- **API Examples**: https://www.themoviedb.org/talk/categories/5047958519c29526f4008016
- **API Settings**: https://www.themoviedb.org/settings/api
- **Community**: https://www.themoviedb.org/talk

---

## 💡 Ejemplos de URLs de Búsqueda

### Búsqueda de Película
```
https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=The%20Matrix&page=1
```

### Búsqueda de Serie
```
https://api.themoviedb.org/3/search/tv?api_key=YOUR_KEY&query=Breaking%20Bad&page=1
```

### Con caracteres especiales
```
https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=Caf%C3%A9&page=1
```

---

## 🔄 Flujo de Ejecución

```
┌─────────────────────────────┐
│   Ejecutar Script           │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  Leer .env para API_KEY    │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ Parsear argumentos CLI      │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ Construir URL con query    │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ HTTP GET a TMDB API        │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ Parsear JSON de respuesta  │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ Formatear y mostrar        │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│    FIN                      │
└─────────────────────────────┘
```

---

**Última actualización**: 2026-05-13
**Versión de API**: v3
**Estado**: ✅ Activo y funcional
