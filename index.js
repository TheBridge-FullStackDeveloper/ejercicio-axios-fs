const axios = require('axios');

const BASE_URL = 'https://pokeapi.co/api/v2';
const SUB_URL = '/pokemon';


const getPokemon = async () => {
    const [, , ...pokemons] = process.argv;

    for await (const pokemon of pokemons) {
        try {
            const URL = `${BASE_URL}${SUB_URL}/${pokemon}`;
            const result = await axios.get(URL);
            const { base_experience, id, sprites, name } = result.data;
            
            console.info(`
            Pokemon: ${name}
            Id: ${id}
            Base EXP: ${base_experience}
            Image: ${sprites.front_default}
            `)
    
        } catch (error) {
            console.error('Error: ', error.message);
        }

    }
}

getPokemon()