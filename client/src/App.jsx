import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddPokemon from "./components/AddPokemon";
import PokemonList from "./components/PokemonList";
import CreatePokemonUser from "./components/CreatePokemonUser";
import "./App.css";
import AddNewPokemon from "./components/AddNewPokemon";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Toaster position="top-right" />
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-pokemon-user">Add Pokemon User</Link>
            </li>

            <li>
              <Link to="/add-pokemon/">Add New Pokemon</Link>
            </li>
            <li>
              <Link to="/pokemon-list">Pokemon List</Link>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route
              path="/add-pokemon/:userId/:pokemonId"
              element={<AddPokemon />}
            />
            <Route path="/add-pokemon-user" element={<CreatePokemonUser />} />
            <Route path="/pokemon-list" element={<PokemonList />} />
            <Route path="/add-pokemon/:id" element={<AddPokemon />} />
            <Route path="/add-pokemon/" element={<AddNewPokemon />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
