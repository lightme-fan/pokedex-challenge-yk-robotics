import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import PokemonModal from "./PokemonModal";
 
const getPokemonList = async () => {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0').then((res)=>res.json())
  return data.results;
}
 
const getPokemonInfo = async (pokemon_name) => {
  const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon-species/'+pokemon_name).then((res)=>res.json())
  const info = {
    description: pokemon.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, " "),
    habitat: pokemon.habitat.name,
    growth_rate: pokemon.growth_rate.name,
    shape: pokemon.shape.name
  }
  return info;
}
 
const getPokemonImageUrl = (pokemon_index) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon_index}.png`
}
 
async function logData () {
  const pokemons =  await getPokemonList()

  let pokemonInfo = await getPokemonInfo(pokemons[0].name)
  let info = {
    name: pokemons[0].name,
    info: pokemonInfo
  }

  console.log('descriptions', info)
}
 
logData()
 
function Pokedex(){
  const [ pokemons, setPokemons ] = useState(null);
  const [ selectValue, setSelectValue ] = useState("");
  const [ pokemonInfo, setPokemonInfo ] = useState(null);
  const [ openModal, setOpenModal ] = useState(false);

  const loadPodekmanData = async () => {
    const pokemonData =  await getPokemonList();
    setPokemons(pokemonData);
  }

  useEffect(() => {
    loadPodekmanData();
  }, []);

  const handleChangeOnSelect = async (event) => {
    setSelectValue(event.target.value);

    const pokemonInfoTemp = await getPokemonInfo(event.target.value);

    const findIndex = (name) => {
      return pokemons.findIndex((pokemon) => pokemon.name === name) + 1;
    }
    
    const modifiedPokemons = {
      ...pokemonInfoTemp,
      name: event.target.value,
      picture: getPokemonImageUrl(findIndex(event.target.value))
    };

    setPokemonInfo(modifiedPokemons);
  }

  const handleClickOnMoreInfo = () => {
    console.log("Open modal");
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <Box>
      <Typography component={"h1"}>Pokedex</Typography>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="pokemon-label">Pokemon selector</InputLabel>
          <Select value={selectValue} labelId="pokemon-label" sx={{ width: "200px" }} onChange={handleChangeOnSelect}>
            {pokemons && pokemons.map((pokemon) => {
              return <MenuItem key={pokemon?.name} value={pokemon?.name}>{pokemon?.name}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Box>
      <Box>
        {
          pokemonInfo && <PokemonCard pokemon={pokemonInfo} onClick={handleClickOnMoreInfo} />
        }
      </Box>

      <Box>
        {openModal && <PokemonModal openModal={openModal} handleClose={handleCloseModal} />}
      </Box>
    </Box>
  )
}

export default Pokedex;