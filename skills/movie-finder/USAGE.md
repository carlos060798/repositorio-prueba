# 📺 Movie Finder - Guía de Uso

Script para consultar **The Movie Database (TMDB)** API de manera interactiva.

## 📋 Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso Básico](#uso-básico)
- [Ejemplos](#ejemplos)
- [Opciones Disponibles](#opciones-disponibles)
- [Solución de Problemas](#solución-de-problemas)

---

## ✅ Requisitos

### Para PowerShell (.ps1)
- PowerShell 5.0 o superior
- Windows 10/11 o PowerShell Core en cualquier SO
- Archivo `.env` en el directorio raíz del proyecto

### Para Node.js (.js)
- Node.js v14 o superior
- npm (incluido en Node.js)
- Archivo `.env` en el directorio raíz del proyecto

---

## 🚀 Instalación

### 1. Configurar API Key

Obtén tu API key de TMDB:

1. Ve a https://www.themoviedb.org/settings/api
2. Inicia sesión en tu cuenta TMDB
3. Haz clic en "Create" para crear una nueva API key
4. Copia tu API key

### 2. Crear archivo `.env`

En la raíz de tu proyecto, crea un archivo `.env`:

```bash
API_KEY=tu_api_key_aqui
```

**Ejemplo:**
```
API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2I4ZDk3ZGY3MDE3ZGIxZTVj...
```

### 3. Scripts Disponibles

Ambos scripts están en `.claude/skills/scripts/`:
- `query-tmdb.ps1` - Para PowerShell
- `query-tmdb.js` - Para Node.js

---

## 💻 Uso Básico

### Con PowerShell

```powershell
.\query-tmdb.ps1 -Query "The Matrix"
```

### Con Node.js

```bash
node query-tmdb.js -q "The Matrix"
```

---

## 📚 Ejemplos

### Buscar una película

**PowerShell:**
```powershell
.\query-tmdb.ps1 -Query "Inception" -SearchType movie
```

**Node.js:**
```bash
node query-tmdb.js -q "Inception" -t movie
```

### Buscar una serie de TV

**PowerShell:**
```powershell
.\query-tmdb.ps1 -Query "Breaking Bad" -SearchType tv
```

**Node.js:**
```bash
node query-tmdb.js -q "Breaking Bad" -t tv
```

### Navegar entre páginas

**PowerShell:**
```powershell
.\query-tmdb.ps1 -Query "Marvel" -Page 2
```

**Node.js:**
```bash
node query-tmdb.js -q "Marvel" -p 2
```

### Usar archivo .env personalizado

**PowerShell:**
```powershell
.\query-tmdb.ps1 -Query "Dune" -EnvPath "C:\mi\ruta\.env"
```

**Node.js:**
```bash
node query-tmdb.js -q "Dune" --env "/mi/ruta/.env"
```

---

## ⚙️ Opciones Disponibles

### PowerShell

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `-Query` | string | Término de búsqueda (requerido) | - |
| `-SearchType` | string | Tipo: `movie` o `tv` | `movie` |
| `-Page` | int | Número de página | `1` |
| `-EnvPath` | string | Ruta al archivo .env | `.env` |

### Node.js

| Opción | Valor | Descripción | Default |
|--------|-------|-------------|---------|
| `-q, --query` | string | Término de búsqueda (requerido) | - |
| `-t, --type` | string | Tipo: `movie` o `tv` | `movie` |
| `-p, --page` | number | Número de página | `1` |
| `--env` | string | Ruta al archivo .env | `.env` |
| `-h, --help` | - | Muestra la ayuda | - |

---

## 🔍 Información de Resultados

Cada resultado incluye:

- **Título**: Nombre de la película/serie
- **ID**: Identificador único en TMDB
- **Fecha de Lanzamiento**: Fecha de estreno
- **Rating**: Puntuación de 0-10
- **Popularidad**: Índice de popularidad
- **Sinopsis**: Descripción breve

---

## ❌ Solución de Problemas

### Error: "API_KEY no encontrada en .env"

**Causa**: El archivo `.env` no existe o no contiene `API_KEY`

**Solución**:
1. Verifica que `.env` existe en el directorio correcto
2. Confirma que tiene el formato: `API_KEY=tu_clave_aqui`
3. No dejes espacios alrededor del `=`

### Error: "No se encontraron resultados"

**Causa**: El término de búsqueda no tiene resultados en TMDB

**Soluciones**:
1. Intenta con un término de búsqueda diferente
2. Verifica la ortografía
3. Prueba con títulos alternativos (en inglés o idioma original)

### Error: "Error en la consulta a TMDB"

**Causa**: Problemas de conexión o API key inválida

**Soluciones**:
1. Verifica tu conexión a internet
2. Comprueba que tu API key es válida en https://www.themoviedb.org/settings/api
3. Intenta en unos minutos (puede haber límite de rate)

### PowerShell: "No se puede cargar el archivo porque la ejecución de scripts está deshabilitada"

**Solución**: Ejecuta PowerShell como administrador y escribe:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📖 Recursos Adicionales

- **API Documentation**: https://developer.themoviedb.org/docs
- **API Settings**: https://www.themoviedb.org/settings/api
- **Crear cuenta**: https://www.themoviedb.org/signup

---

## 💡 Tips

1. **Guarda resultados a archivo**:
   - PowerShell: `.\query-tmdb.ps1 -Query "test" | Out-File resultados.txt`
   - Node.js: `node query-tmdb.js -q "test" > resultados.txt`

2. **Búsquedas avanzadas**: Usa términos específicos para mejores resultados
   - ✅ "The Matrix 1999"
   - ✅ "Breaking Bad TV"
   - ❌ "movie about matrix"

3. **Rate Limiting**: TMDB tiene límites de 40 requests/10 segundos. Si exceedes, espera unos minutos.

---

## 📝 Licencia

Datos proporcionados por [The Movie Database (TMDB)](https://www.themoviedb.org/)
