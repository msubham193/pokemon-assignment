const fs = require("fs").promises;
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/pokemonData.json");

exports.readData = async () => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return { users: [] };
    }
    throw error;
  }
};

exports.writeData = async (data) => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
};
