const axios = require('axios');
const fs = require('fs');

const BASE_URL = 'https://pokeapi.co/api/v2/';
const SUB_URL = '/pokemon';

const addPokemon = async (name) =>{

    const [, , ...pokemons] = process.argv //guarda en un array todo lo que ingresemos en node ej: node index.js charizard pikachu
    console.log("pokemons: ", pokemons)
    let newPokemon = {}
    for await(const pokemon of pokemons){
        try{
            const URL =`${BASE_URL}${SUB_URL}/${pokemon}`;
            const result = await axios.get(URL);
            const {name, base_experience, id, sprites} = result.data;
            
            newPokemon.name = name;
            newPokemon.id = id;
            newPokemon.base = base_experience;
            newPokemon.sprites = {front_default:sprites.front_default, shiny:sprites.front_shiny}


            //console.log(newPokemon)
            if(fs.existsSync('./pokemons.json')){

               let file = JSON.parse(fs.readFileSync('./pokemons.json'))
               file.push(newPokemon)
               //file.push(newPokemon)
               console.log(file)
               fs.writeFile('./pokemons.json', JSON.stringify(file, null, 2),'utf8' , function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("data written");
                }
            });
              
            }else{
                fs.writeFile('./pokemons.json', JSON.stringify([newPokemon], null, 2),'utf8' , function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("data written");
                    }
                });
            }
            


        }catch(error){
            console.log("Error found: ",error.message)
        }
    }

}

addPokemon()