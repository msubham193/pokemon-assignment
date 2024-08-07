const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.post("/users/:pokemonOwnerName/pokemon", pokemonController.addPokemon);
router.get("/names", pokemonController.getPokemonNames);
router.get("/user/:userId", pokemonController.getPokemonsByUserId);
router.get("/abilities/:pokemonName", pokemonController.getPokemonAbilities);
router.put(
  "/users/:pokemonOwnerId/:pokemonId",
  pokemonController.updatePokemon
);
router.delete(
  "/users/:pokemonOwnerName/pokemon/:pokemonId",
  pokemonController.deletePokemon
);

router.get(
  "/users/:userId/:pokemonId",
  pokemonController.getPokemonByUserIdAndPokemonId
);

module.exports = router;
