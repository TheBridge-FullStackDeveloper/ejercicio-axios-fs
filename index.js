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
    /DATA if it already exists but couldn't 😫😭


    if (isData) return    <-- this was in createDir
*/


// CREATE DATA DIR
const createDir = async () => {
    try {
        await mkdir(path.join(__dirname, 'data'), (err) => {
            if (err) {
                //empty so it doesn't spam me errors when it's already created
            } else {
                console.log('dir created');
            };
        });
    } catch (error) {
        console.error('Error try catch mkdir: ', error)
    };
};

// CREATE DATA FILE
//   can't figure out how to not rewrite saved data 🤔

const createDatabase = () => {
    writeFile('./data/pokemon.js', JSON.stringify([]), err => {
        if (err) {
            console.error('updating pokemon data err: ', err)
        }
    });
}

const getPokemon = async () => {
    const [, , ...pokemons] = process.argv;
    
    for await (const pokemon of pokemons) {
        try {
            const URL = `${BASE_URL}${SUB_URL}/${pokemon}`;
            const result = await axios.get(URL);
            const { base_experience, id, sprites, name } = result.data;
            
            const newPokemon = {
                [name]: {
                    base_EXP: base_experience,
                    id: id,
                    images: {
                        front_deafult: sprites.front_default,
                        shiny: sprites.front_shiny
                    }
                },
            };
            
            let pokemonData = require('./data/pokemon.js');
            let newPokemonData;
            
            if (Object.keys(pokemonData).length === 0) {
                newPokemonData = newPokemon;
            } else {
                newPokemonData = [...pokemonData, newPokemon];
                console.log(newPokemonData);
            };

            
            appendFile('./data/pokemon.js', JSON.stringify([newPokemonData]), err => {
                if (err) {
                    console.error('writeFile err: ', err)
                } else {
                    console.info(newPokemon)
                };
            });
            
        } catch (error) {
            console.error('Catch error: ', error.message);
            //Catch error:  Cannot read properties of undefined (reading '#<Object>')
        };
        
    };
};




createDir()
//createDatabase()
getPokemon()