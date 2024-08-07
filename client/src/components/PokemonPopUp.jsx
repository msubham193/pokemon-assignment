import "./styles/PokemonPopup.css";
import PropTypes from "prop-types";

const PokemonPopup = ({ pokemons, onClose, onSelectPokemon }) => {
  return (
    <div className="pokemon-popup-overlay">
      <div className="pokemon-popup">
        <h2>Select a Pokémon to Edit</h2>

        <ul>
          {pokemons?.map((pokemon) => (
            <li key={pokemon.id} onClick={() => onSelectPokemon(pokemon.id)}>
              {pokemon.pokemonName}
            </li>
          ))}
        </ul>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

PokemonPopup.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      pokemonName: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectPokemon: PropTypes.func.isRequired,
};
export default PokemonPopup;
