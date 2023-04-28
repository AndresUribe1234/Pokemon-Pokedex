import { createContext, useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoritePokemonContext = createContext({
  favoritePokemon: [],
  addFavoritePokemon: (pokemonName, imageUrl, typeArray) => {},
  removeFavoritePokemon: (pokemonName, imageUrl, typeArray) => {},
});

function FavoritePokemonContextProvider(props) {
  const [favoritePokemon, setFavoritePokemon] = useState([]);

  useEffect(() => {
    console.log("App started!");
    async function fetchLocalStorage() {
      const data = await AsyncStorage.getItem("favoritePokemon");
      const dataObject = JSON.parse(data);

      setFavoritePokemon([...dataObject]);
    }

    fetchLocalStorage();
  }, []);

  function addFavorite(pokemonName, imageUrl, typeArray) {
    setFavoritePokemon((prev) => [
      ...prev,
      { pokemonName, imageUrl, typeArray },
    ]);

    AsyncStorage.setItem(
      "favoritePokemon",
      JSON.stringify([...favoritePokemon, { pokemonName, imageUrl, typeArray }])
    );
  }

  function removeFavorite(pokemonName) {
    const newArray = favoritePokemon.filter(
      (ele) => ele.pokemonName !== pokemonName
    );
    setFavoritePokemon(newArray);
    AsyncStorage.setItem("favoritePokemon", JSON.stringify(newArray));
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
