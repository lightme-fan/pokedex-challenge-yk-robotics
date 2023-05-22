export const dataModifier = (pokemon, name, picture) => {
  const modifiedPokemons = {
    ...pokemon,
    name: name,
    picture: picture
  };
  return modifiedPokemons
}