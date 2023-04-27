import { createContext } from "react";
import { useState } from "react";

export const FavoritePokemonContext = createContext({
  favoritePokemon: [],
  addFavoritePokemon: (pokemonName, imageUrl, typeArray) => {},
  removeFavoritePokemon: (pokemonName, imageUrl, typeArray) => {},
});

function FavoritePokemonContextProvider(props) {
  const [favoritePokemon, setFavoritePokemon] = useState([]);

  function addFavorite(pokemonName, imageUrl, typeArray) {
    setFavoritePokemon((prev) => [
      ...prev,
      { pokemonName, imageUrl, typeArray },
    ]);
  }

  function removeFavorite(pokemonName) {
    const newArray = favoritePokemon.filter(
      (ele) => ele.pokemonName !== pokemonName
    );
    setFavoritePokemon(newArray);
  }

  const context = {
    favoritePokemon,
    addFavoritePokemon: addFavorite,
    removeFavoritePokemon: removeFavorite,
  };

  return (
    <FavoritePokemonContext.Provider value={context}>
      {props.children}
    </FavoritePokemonContext.Provider>
  );
}

export default FavoritePokemonContextProvider;
