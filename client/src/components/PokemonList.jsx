import { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash, Plus } from "lucide-react";
import "./styles/PokemonList.css";
import { useNavigate } from "react-router-dom";
import PokemonPopup from "./PokemonPopUp";

const BASE_URL = "https://pokemon-assignment-3qim.onrender.com";
const PokemonList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserPokemons, setSelectedUserPokemons] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${BASE_URL}/api/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/pokemon/user/${userId}`
      );
      setSelectedUserPokemons(response.data);
      setSelectedUserId(userId);
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching user's Pokémon:", error);
    }
  };

  const navigate = useNavigate();

  const handleSelectPokemon = (pokemonId) => {
    setShowPopup(false);
    navigate(`/add-pokemon/${selectedUserId}/${pokemonId}`);
  };

  return (
    <div className="pokemon-list">
      <h2>List of Pokemon Users</h2>
      <table>
        <thead>
          <tr>
            <th>Pokemon Owner Name</th>
            <th>Pokemon Name</th>
            <th>Pokemon Ability</th>
            <th>No. of Pokemon</th>
            <th>Add Pokemon</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.pokemonOwnerName}</td>
              <td>{user.pokemon[0]?.pokemonName || "-"}</td>
              <td>{user.pokemon[0]?.pokemonAbility || "-"}</td>
              <td>{user.pokemon.length}</td>
              <td>
                <button
                  className="action-button add"
                  onClick={() =>
                    navigate(`/add-pokemon/${user.pokemonOwnerName}`)
                  }
                >
                  <Plus size={18} />
                </button>
              </td>
              <td>
                <button
                  className="action-button edit"
                  onClick={() => handleEditUser(user.id)}
                >
                  <Edit size={18} />
                </button>
              </td>
              <td>
                <button
                  className="action-button delete"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <PokemonPopup
          pokemons={selectedUserPokemons}
          onClose={() => setShowPopup(false)}
          onSelectPokemon={handleSelectPokemon}
        />
      )}
    </div>
  );
};

export default PokemonList;
