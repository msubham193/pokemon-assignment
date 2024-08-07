const axios = require("axios");

const BASE_URL = process.env.POKEMON_API_BASE_URL;

exports.getPokemonNames = async () => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=1000`
    );
    return response.data.results.map((pokemon) => pokemon.name);
  } catch (error) {
    throw new Error("Failed to fetch Pokemon names");
  }
};

exports.getPokemonAbilities = async (pokemonName) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    return response.data.abilities.map((ability) => ability.ability.name);
  } catch (error) {
    throw new Error("Failed to fetch Pokemon abilities");
  }
};
