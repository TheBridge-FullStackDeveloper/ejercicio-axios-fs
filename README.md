## Ejercicio 🚀

- Inicializa un proyecto `npm`
- Instala `axios`

- Crea una aplicación que, ejecutándola desde la terminal con argumentos, busque en la pokeapi los pokémons recibidos y guarde, en un fichero `pokemons.json`, un objeto cuyas propiedades sean los nombres de los pokémons buscados, y su valor otro objeto con los campos: experiencia base, id, imagen fronta e imagen shiny.

Además, cada vez que ejecutemos la aplicación y busquemos nuevos pokémons, deben guardarse en el fichero `pokemons.json` ✨SIN ELIMINAR✨ los guardados previamente

Para iterar sobre la lista obtenida de `process.argv`, usad `for await...of` o `Promise.all`. Más referencias de ésta última en: https://javascript.info/promise-api

Ejemplo de fichero `pokemons.json`

```
{
  "squirtle" : {
    "base_experience": 190,
    "id": 5,
    "sprites": {
      "front_default": "",
      "shiny": ""
    }
  },
  "gyarados": {
    "base_experience": 180,
    "id": 130,
    "sprites": {
      "front_default": "",
      "shiny": ""
    }
  }
}
```
