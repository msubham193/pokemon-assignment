const dataService = require("../services/dataService");
const pokemonApiService = require("../services/pokemonApiService");

exports.addPokemon = async (req, res) => {
  try {
    const { pokemonOwnerName } = req.params;
    const {
      pokemonName,
      pokemonAbility,
      initialPositionX,
      initialPositionY,
      speed,
      direction,
    } = req.body;

    const data = await dataService.readData();
    let userIndex = data.users.findIndex(
      (user) => user.pokemonOwnerName === pokemonOwnerName
    );
    if (userIndex === -1) {
      // If user doesn't exist, create a new user
      const newUser = {
        id: Date.now().toString(),
        pokemonOwnerName,
        pokemon: [],
      };
      data.users.push(newUser);
      userIndex = data.users.length - 1;
    }

    const newPokemon = {
      id: Date.now().toString(),
      pokemonName,
      pokemonAbility,
      initialPositionX: Number(initialPositionX),
      initialPositionY: Number(initialPositionY),
      speed: Number(speed),
      direction,
    };

    data.users[userIndex].pokemon.push(newPokemon);
    await dataService.writeData(data);
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPokemonNames = async (req, res) => {
  try {
    const names = await pokemonApiService.getPokemonNames();
    res.json(names);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPokemonAbilities = async (req, res) => {
  try {
    const { pokemonName } = req.params;
    const abilities = await pokemonApiService.getPokemonAbilities(pokemonName);
    res.json(abilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPokemonsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const data = await dataService.readData();
    const user = data.users.find((user) => user.id == userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.pokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePokemon = async (req, res) => {
  try {
    const { pokemonOwnerId, pokemonId } = req.params;
    const updateData = req.body;
    const data = await dataService.readData();
    const userIndex = data.users.findIndex((user) => user.id == pokemonOwnerId);
    if (userIndex === -1)
      return res.status(404).json({ message: "User not found" });
    const pokemonIndex = data.users[userIndex].pokemon.findIndex(
      (p) => p.id === pokemonId
    );
    if (pokemonIndex === -1)
      return res.status(404).json({ message: "Pokemon not found" });
    data.users[userIndex].pokemon[pokemonIndex] = {
      ...data.users[userIndex].pokemon[pokemonIndex],
      ...updateData,
    };
    await dataService.writeData(data);
    res.json(data.users[userIndex].pokemon[pokemonIndex]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getPokemonByUserIdAndPokemonId = async (req, res) => {
  try {
    const { userId, pokemonId } = req.params;
    const data = await dataService.readData();
    const user = data.users.find((user) => user.id == userId);

    console.log("USER", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pokemon = user.pokemon.find((p) => p.id == pokemonId);

    console.log("POKEMON", pokemon);

    if (!pokemon) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePokemon = async (req, res) => {
  try {
    const { pokemonOwnerName, pokemonId } = req.params;
    const data = await dataService.readData();
    const userIndex = data.users.findIndex(
      (user) => user.pokemonOwnerName === pokemonOwnerName
    );
    if (userIndex === -1)
      return res.status(404).json({ message: "User not found" });
    const pokemonIndex = data.users[userIndex].pokemon.findIndex(
      (p) => p.id === pokemonId
    );
    if (pokemonIndex === -1)
      return res.status(404).json({ message: "Pokemon not found" });
    data.users[userIndex].pokemon.splice(pokemonIndex, 1);
    await dataService.writeData(data);
    res.json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
