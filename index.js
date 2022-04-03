const axios = require('axios');
const path = require('path')
const { writeFile, mkdir, appendFile } = require('fs');

const BASE_URL = 'https://pokeapi.co/api/v2';
const SUB_URL = '/pokemon';

/*
let isData
const isDataCreated = () => {
    
    stat(path.join(__dirname, 'data'), (err, stats) => {
        if (err) {
            console.error(err)     
        } else {
            isData = stats.isDirectory()
        };
    });
    return isData
};
    tried to do a function that serves as an IF to not create
    /DATA if it already exists but couldn't :(
    if (isData) return    
*/


// CREATE DATA DIR
const createDir = async () => {
    try {
        await mkdir(path.join(__dirname, 'data'), (err) => {
            if (err) {
                
            } else {
                console.log('dir created')
            };
        });
    } catch (error) {
        console.error('Error try catch mkdir: ', error)
    };
};

// CREATE DATA FILE
/*
const createDatabase = () => {
    writeFile('./data/pokemon.js', JSON.stringify({}), err => {
        if (err) {
            console.error('updating pokemon data err: ', err)
        }
    });
}
*/

const getPokemon = async () => {
    const [, , ...pokemons] = process.argv;
    
    for await (const pokemon of pokemons) {
        try {
            const URL = `${BASE_URL}${SUB_URL}/${pokemon}`;
            const result = await axios.get(URL);
            const { base_experience, id, sprites, name } = result.data;

            const newPokemon = `
            Pokemon: ${name}
            Id: ${id}
            Base EXP: ${base_experience}
            Image: ${sprites.front_default}
            
            `;
            
            let pokemonData = require('./data/pokemon.js');
            let newPokemonData = newPokemon;
            
            if (Object.keys(pokemonData).length) {
                newPokemonData = [...pokemonData, newPokemon];
                console.log(newPokemonData);
            };

            
            writeFile('./data/pokemon.js', JSON.stringify(pokemonData), err => {
                if (err) {
                    console.error('updating pokemon data err: ', err)
                };
            });
            
        } catch (error) {
            console.error('For await error: ', error.message);
        };
        
    };
};




createDir()
//createDatabase()
getPokemon()