import { useState, useEffect, useRef } from "react";

import { Play, AlertTriangle, Pause } from "lucide-react";
import "./styles/HomePage.css";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userPokemons, setUserPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const animationFrameId = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserChange = async (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    try {
      const response = await fetch(
        `http://localhost:3000/api/pokemon/user/${userId}`
      );
      const data = await response.json();
      setUserPokemons(data);
    } catch (error) {
      console.error("Error fetching user pokemons:", error);
    }
  };

  const handleGoClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    // setIsPlaying(true);
    setIsVisible(true);
  };

  const handleBackClick = () => {
    setSelectedPokemon(null);
    setIsPlaying(false);
    setIsVisible(true);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  };

  const handleFleeClick = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  const handleCeaseClick = () => {
    setIsPlaying(false);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  };

  const movePokemon = (pokemon) => {
    if (!pokemon || !isPlaying) return;
    const playground = document.querySelector(".pokemon-playground");
    const pokemonElement = document.querySelector(".pokemon");
    const speed = pokemon.speed; // speed in px per second

    let posX = pokemon.initialPositionX;
    let posY = pokemon.initialPositionY;

    const move = () => {
      if (!isPlaying) return;

      switch (pokemon.direction) {
        case "N":
          posY -= speed / 10;
          break;
        case "S":
          posY += speed / 10;
          break;
        case "E":
          posX += speed / 10;
          break;
        case "W":
          posX -= speed / 10;
          break;
        default:
          break;
      }

      pokemonElement.style.top = `${posY}px`;
      pokemonElement.style.left = `${posX}px`;

      if (
        posX < 0 ||
        posY < 0 ||
        posX > playground.clientWidth - 50 ||
        posY > playground.clientHeight - 50
      ) {
        pokemonElement.style.display = "none";
      } else {
        pokemonElement.style.display = isVisible ? "block" : "none";
      }

      animationFrameId.current = requestAnimationFrame(move);
    };

    animationFrameId.current = requestAnimationFrame(move);
  };

  useEffect(() => {
    movePokemon(selectedPokemon);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [selectedPokemon, isPlaying, isVisible]);

  return (
    <div className="home-page">
      <h2>Pokemon Dashboard</h2>
      {!selectedPokemon ? (
        <>
          <div className="user-select">
            <label htmlFor="user-select">Select User</label>
            <select
              id="user-select"
              value={selectedUser}
              onChange={handleUserChange}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.pokemonOwnerName}
                </option>
              ))}
            </select>
          </div>
          {userPokemons.length > 0 && (
            <table className="pokemon-table">
              <thead>
                <tr>
                  <th>Pokemon Name</th>
                  <th>Ability</th>
                  <th>Initial Position X</th>
                  <th>Initial Position Y</th>
                  <th>Speed</th>
                  <th>Direction</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userPokemons.map((pokemon) => (
                  <tr key={pokemon.id}>
                    <td>{pokemon.pokemonName}</td>
                    <td>{pokemon.pokemonAbility}</td>
                    <td>{pokemon.initialPositionX}</td>
                    <td>{pokemon.initialPositionY}</td>
                    <td>{pokemon.speed}</td>
                    <td>{pokemon.direction}</td>
                    <td>
                      <button
                        className="action-button go"
                        onClick={() => handleGoClick(pokemon)}
                      >
                        <Play size={18} /> Play
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <div className="pokemon-playground-container">
          <div className="pokemon-actions-top">
            <button onClick={handleBackClick}>Back</button>
            <button
              className="action-button go"
              onClick={() => setIsPlaying(true)}
            >
              <Play size={18} /> Go
            </button>
            <button className="action-button flee" onClick={handleFleeClick}>
              <AlertTriangle size={18} /> Flee
            </button>
            <button className="action-button cease" onClick={handleCeaseClick}>
              <Pause size={18} /> Cease
            </button>
          </div>
          <div className="pokemon-playground">
            <div
              className="pokemon"
              style={{
                top: `${selectedPokemon.initialPositionY}px`,
                left: `${selectedPokemon.initialPositionX}px`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
