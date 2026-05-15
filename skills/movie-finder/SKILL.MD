---
name: movie-finder
description: busca y consulta el información de películas y series de TV utilizando la API de TMDB. (The Movie Database) usa esta skill para encontrar detalles sobre tus películas y series favoritas, incluyendo sinopsis, géneros, fechas de lanzamiento y más. Ideal para cinéfilos y amantes de las series que quieren obtener información rápida y precisa sobre sus títulos favoritos.

allow-tools: Bash(bash:*)
---

# Movie Finder 

skill para buscar y consultar información de películas y series de TV utilizando la API de TMDB (The Movie Database). Usa esta skill para encontrar detalles sobre tus películas y series favoritas

worflow para buscar una película o serie de TV:
1. El usuario ingresa el título de la película o serie que desea buscar.
2. La skill utiliza  el script dela archivo claude\skills\movie-finder\scripts\query-tmdb.js
la API de TMDB para realizar una búsqueda basada en el título proporcionado por el usuario.
3. La skill procesa la respuesta de la API y extrae información relevante como el título, año de lanzamiento, género y sinopsis.
4. La skill presenta los resultados al usuario de manera clara y organizada, permitiéndole navegar entre diferentes resultados si hay múltiples coincidencias 

flujo de trabajo recomendado para usar la skill:
1. Configura tu entorno con tu API key de TMDB siguiendo las instrucciones en la sección "Configuración" de la documentación.
2. Ejecuta el script de consulta con el título de la película o serie que deseas buscar.
3. Revisa los resultados y navega entre ellos si es necesario para encontrar la información que buscas.
4. Si encuentras algún error o problema, consulta la sección de "Solución de Problemas" para obtener ayuda.



