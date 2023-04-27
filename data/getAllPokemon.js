const axios = require("axios");
const fs = require("fs");

const baseUrl = "https://pokeapi.co/api/v2/pokemon";
const pageSize = 20; // default page size
const maxPokemon = 898; // number of pokemon as of September 2021

async function getAllPokemon() {
  let allPokemon = [];
  console.log("Started fetching...");

  // loop through all pages of pokemon data
  for (let i = 0; i < Math.ceil(maxPokemon / pageSize); i++) {
    console.log(`Fetching page ${i + 1}...`);
    const offset = i * pageSize;
    const url = `${baseUrl}?offset=${offset}&limit=${pageSize}`;

    // make request to current page
    const response = await axios.get(url);
    const pokemonList = response.data.results;

    // add pokemon to array
    allPokemon = [...allPokemon, ...pokemonList];
  }

  // extract pokemon names from results
  const pokemonNames = allPokemon.map((pokemon) => pokemon.name);

  // write results to file
  fs.writeFile("pokemonList.json", JSON.stringify(pokemonNames), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Pokemon list saved to pokemonList.json");
  });
}

getAllPokemon();
