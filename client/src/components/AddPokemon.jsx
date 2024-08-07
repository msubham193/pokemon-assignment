// AddPokemon.js
import React, { useState, useEffect } from "react";
import "./styles/AddPokemon.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPokemonNames,
  fetchPokemonAbilities,
  handleSubmit,
} from "../utils/pokemonUtils";

const AddPokemon = () => {
  const params = useParams();
  const navigate = useNavigate();

  const isUpdating = !!params.pokemonId;

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [pokemonAbility, setPokemonAbility] = useState("");
  const [initialPositionX, setInitialPositionX] = useState();
  const [initialPositionY, setInitialPositionY] = useState();
  const [speed, setSpeed] = useState();
  const [direction, setDirection] = useState("");
  const [pokemonNames, setPokemonNames] = useState([]);

  useEffect(() => {
    if (isUpdating) {
      fetchPokemonData();
    }
    fetchPokemonNames(setPokemonNames);
  }, [isUpdating]);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/pokemon/users/${params.userId}/${params.pokemonId}`
      );
      const data = await response.json();
      setPokemonName(data.pokemonName);
      setPokemonAbility(data.pokemonAbility);
      setInitialPositionX(data.initialPositionX);
      setInitialPositionY(data.initialPositionY);
      setSpeed(data.speed);
      setDirection(data.direction);
      fetchPokemonAbilities(
        data.pokemonName,
        setPokemonAbilities,
        setPokemonAbility
      );
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const onSubmit = (e) => {
    handleSubmit(
      e,
      isUpdating
        ? `http://localhost:3000/api/pokemon/users/${params.userId}/${params.pokemonId}`
        : `http://localhost:3000/api/pokemon/users/${params.id}/pokemon`,
      isUpdating ? "PUT" : "POST",
      {
        pokemonName,
        pokemonAbility,
        initialPositionX,
        initialPositionY,
        speed,
        direction,
      },
      navigate,
      isUpdating
    );
  };

  return (
    <div className="add-pokemon">
      <h1>{isUpdating ? "Update Pokemon" : "Add Pokemon"}</h1>
      {isUpdating ? null : (
        <input
          type="text"
          placeholder="Select user"
          value={params.id}
          readOnly
        />
      )}
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
      <button onClick={onSubmit}>
        {isUpdating ? "Update Pokemon" : "Add Pokemon"}
      </button>
    </div>
  );
};

export default AddPokemon;
