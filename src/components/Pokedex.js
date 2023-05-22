import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import PokemonModal from "./PokemonModal";
import { dataModifier } from "../utils";
 
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
 
function Pokedex(){
  const [ pokemons, setPokemons ] = useState(null);
  const [ selectValue, setSelectValue ] = useState("");
  const [ inputValue, setInputValue ] = useState("");
  const [ pokemonInfo, setPokemonInfo ] = useState(null);
  const [ openModal, setOpenModal ] = useState(false);

  const loadPodekmanData = async () => {
    const pokemonData =  await getPokemonList();
    setPokemons(pokemonData);
  }

  useEffect(() => {
    loadPodekmanData();
  }, []);

  // Handle input select
  const handleChangeOnSelect = async (event) => {
    setSelectValue(event.target.value);
    setInputValue("");

    const pokemonInfoTemp = await getPokemonInfo(event.target.value);

    const findIndex = (name) => {
      return pokemons.findIndex((pokemon) => pokemon.name === name) + 1;
    }

    const newPokemon = dataModifier(
      pokemonInfoTemp,
      event.target.value,
      getPokemonImageUrl(findIndex(event.target.value))
    );
    setPokemonInfo(newPokemon);
  }

  const handleInputSearch = (event) => {
    setSelectValue("");
    setInputValue(event.target.value);

  }
  // Handle search
  const handleSearch = async () => {
    const findPokemon = pokemons && pokemons.find(pokemon => pokemon.name.toLowerCase().includes(inputValue.toLowerCase()));
    
    const pokemonInfoTemp = findPokemon  && await getPokemonInfo(findPokemon?.name);

    const findIndex = (name) => {
      return pokemons && pokemons.findIndex((pokemon) => pokemon.name === name) + 1;
    }

    const newPokemon = pokemonInfoTemp && dataModifier(
      pokemonInfoTemp,
      findPokemon && findPokemon?.name,
      findPokemon && getPokemonImageUrl(findIndex(findPokemon?.name))
    );
    setPokemonInfo(newPokemon);
  }

  // Open Modal
  const handleClickOnMoreInfo = () => {
    setOpenModal(true);
  }

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <Box>
      <Typography component={"h1"} sx={{ textAlign: "center", fontSize: "34px" }}>Pokedex</Typography>
      <Box sx={{ margin: "16px 0", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap"}}>
        <FormControl fullWidth sx={{ maxWidth: "300px", margin: "16px 0"}}>
        <InputLabel id="pokemon-label">Pokemon selector</InputLabel>
          <Select
            value={selectValue}
            labelId="pokemon-label"
            id="pokemon-select"
            label="Pokemon selector"
            sx={{ maxWidth: "300px", width: "100%" }}
            onChange={handleChangeOnSelect}
          >
            {pokemons && pokemons.map((pokemon) => {
              return <MenuItem key={pokemon?.name} value={pokemon?.name}>{pokemon?.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
            margin: "16px 0"
          }}
        >
          <TextField
            id="outlined-basic"
            label="Search pokemon by name"
            variant="outlined"
            sx={{maxWidth: "300px", width: "100%"}}
            value={inputValue}
            onChange={handleInputSearch}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{borderTopLeftRadius: "0", borderBottomLeftRadius: "0"}}
            onClick={handleSearch}
          >
            Search
          </Button>
        </FormControl>
      </Box>
      <Box sx={{ maxWidth:"500px", margin: "62px auto 0 auto"}}>
        {
          pokemonInfo
            ? <PokemonCard pokemon={pokemonInfo} onClick={handleClickOnMoreInfo} />
            : <Typography component={"div"} sx={{ textAlign: "center" }}>
                No pokemon to show! Please select one or search with the correct name. Thanks!
              </Typography>
        }
      </Box>
      <Box>
        {openModal && 
          <PokemonModal
            openModal={openModal}
            handleClose={handleCloseModal}
            pokemon={pokemonInfo}
          />
        }
      </Box>
    </Box>
  )
}

export default Pokedex;