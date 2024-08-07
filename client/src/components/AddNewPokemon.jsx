// AddNewPokemon.js
import React, { useState, useEffect } from "react";
import "./styles/AddNewPokemon.css";
import { useParams } from "react-router-dom";
import {
  fetchPokemonNames,
  fetchPokemonAbilities,
  fetchUsers,
  handleSubmit,
} from "../utils/pokemonUtils";

const AddNewPokemon = () => {
  const params = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(params.id);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [pokemonAbility, setPokemonAbility] = useState("");
  const [initialPositionX, setInitialPositionX] = useState();
  const [initialPositionY, setInitialPositionY] = useState();
  const [speed, setSpeed] = useState();
  const [direction, setDirection] = useState("");
  const [pokemonNames, setPokemonNames] = useState([]);

  useEffect(() => {
    fetchPokemonNames(setPokemonNames);
    fetchUsers(setUsers);
  }, []);

  const onSubmit = (e) => {
    handleSubmit(
      e,
      `http://localhost:3000/api/pokemon/users/${selectedUser}/pokemon`,
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
      <h1>Add a new pokemon</h1>

      <select
        id="user-select"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.pokemonOwnerName}>
            {user.pokemonOwnerName}
          </option>
        ))}
      </select>

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
      <button onClick={onSubmit}>Add Pokemon</button>
    </div>
  );
};

export default AddNewPokemon;
