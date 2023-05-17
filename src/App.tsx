import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pokedex from './components/Pokedex';
import { createBrowserRouter } from 'react-router-dom';
import PokedexPage from './pages/PokedexPage';
import PokemonInfo from './pages/PokemonInfo';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PokedexPage />
    },
    {
      path: "/pokemon_info",
      element: <PokemonInfo />
    },
  ]);

  return (
    <div className="App">
      <Pokedex />
    </div>
  );
}

export default App;
