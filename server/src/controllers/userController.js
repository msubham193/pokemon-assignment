const dataService = require("../services/dataService");

exports.createUser = async (req, res) => {
  try {
    const { pokemonOwnerName } = req.body;
    const data = await dataService.readData();
    const newUser = {
      id: Date.now().toString(),
      pokemonOwnerName,
      pokemon: [],
    };
    data.users.push(newUser);
    await dataService.writeData(data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await dataService.readData();
    res.json(data.users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { pokemonOwnerName } = req.body;
    const data = await dataService.readData();
    const userIndex = data.users.findIndex((user) => user.id === id);
    if (userIndex === -1)
      return res.status(404).json({ message: "User not found" });
    data.users[userIndex].pokemonOwnerName = pokemonOwnerName;
    await dataService.writeData(data);
    res.json(data.users[userIndex]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await dataService.readData();
    const userIndex = data.users.findIndex((user) => user.id === id);
    if (userIndex === -1)
      return res.status(404).json({ message: "User not found" });
    data.users.splice(userIndex, 1);
    await dataService.writeData(data);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
