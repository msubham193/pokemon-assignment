// CreatePokemonUser.js
import React, { useState, useEffect } from "react";
import "./styles/AddPokemon.css";
import {
  fetchPokemonNames,
  fetchPokemonAbilities,
  handleSubmit,
} from "../utils/pokemonUtils";
const BASE_URL = "https://pokemon-assignment-3qim.onrender.com";
const CreatePokemonUser = () => {
  const [pokemonOwnerName, setPokemonOwnerName] = useState("");
  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [pokemonAbility, setPokemonAbility] = useState("");
  const [initialPositionX, setInitialPositionX] = useState();
  const [initialPositionY, setInitialPositionY] = useState();
  const [speed, setSpeed] = useState();
  const [direction, setDirection] = useState("");

  useEffect(() => {
    fetchPokemonNames(setPokemonNames);
  }, []);

  const onSubmit = (e) => {
    handleSubmit(
      e,
      `${BASE_URL}/api/pokemon/users/${pokemonOwnerName}/pokemon`,
      "POST",
      {
        pokemonName,
        pokemonAbility,
        initialPositionX,
        initialPositionY,
        speed,
        direction,
      },
      null,
      false
    );
  };

  return (
    <div className="add-pokemon">
      <h1>Create Pokémon User</h1>
      <input
        type="text"
        placeholder="Pokémon Owner Name"
        value={pokemonOwnerName}
        onChange={(e) => setPokemonOwnerName(e.target.value)}
      />
      <select
        value={pokemonName}
        onChange={(e) => {
          setPokemonName(e.target.value);
          fetchPokemonAbilities(
            e.target.value,
            setPokemonAbilities,
            setPokemonAbility
          );
        }}
      >
        <option value="" disabled>
          Select a Pokémon
        </option>
        {pokemonNames.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
      {pokemonAbilities.length > 1 ? (
        <select
          value={pokemonAbility}
          onChange={(e) => setPokemonAbility(e.target.value)}
        >
          <option value="" disabled>
            Select an ability
          </option>
          {pokemonAbilities.map((ability, index) => (
            <option key={index} value={ability}>
              {ability}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          placeholder="Pokémon Ability"
          value={pokemonAbility}
          readOnly={pokemonAbilities.length === 1}
          onChange={(e) => setPokemonAbility(e.target.value)}
        />
      )}
      <input
        type="number"
        placeholder="Initial Position X"
        value={initialPositionX}
        onChange={(e) => setInitialPositionX(e.target.value)}
      />
      <input
        type="number"
        placeholder="Initial Position Y"
        value={initialPositionY}
        onChange={(e) => setInitialPositionY(e.target.value)}
      />
      <input
        type="number"
        placeholder="Speed"
        value={speed}
        onChange={(e) => setSpeed(e.target.value)}
      />
      <input
        type="text"
        placeholder="Direction in W,E,N,S"
        value={direction}
        onChange={(e) => setDirection(e.target.value)}
      />
      <button onClick={onSubmit}>Create Pokémon User</button>
    </div>
  );
};

export default CreatePokemonUser;
