const fs = require("fs");

// Read the JSON data from a file (assuming it's stored in a file named data.json)
const rawData = fs.readFileSync("./types.json");
const data = JSON.parse(rawData);
console.log(data);

// Extract the "results" array from the data
const results = data.results.map((ele) => ele.name);

// Write the results to a new file (assuming you want to write to a file named results.json)
fs.writeFile("pokemonTypes.json", JSON.stringify(results), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Results saved to pokemonTypes.json");
});

// Adding colors to an array of type + color
const typeColors = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  unknown: "#68A090",
  shadow: "#493963",
};

const pokemonTypes = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
  "unknown",
  "shadow",
];

const pokemonTypeColors = pokemonTypes.map((pokemonType) => ({
  pokemonType,
  color: typeColors[pokemonType],
}));

console.log(pokemonTypeColors);

fs.writeFile(
  "pokemonTypesColor.json",
  JSON.stringify(pokemonTypeColors),
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Results saved to pokemonTypes.json");
  }
);
