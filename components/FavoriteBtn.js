import { Pressable, StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useContext, useEffect } from "react";
import { FavoritePokemonContext } from "../store/favorites-context";

const FavoriteBtn = (props) => {
  const [favorite, setFavorite] = useState(props.isFavorite);
  const pokemonName = props.pokemonName;
  const pokemonType = props.pokemonType;
  const pokemonUrl = props.pokemonUrl;
  const FavPokemonCtx = useContext(FavoritePokemonContext);

  useEffect(() => {
    setFavorite(props.isFavorite);
  }, [props]);

  const pressHandler = () => {
    if (favorite) {
      FavPokemonCtx.removeFavoritePokemon(pokemonName, pokemonUrl, pokemonType);
      setFavorite(false);
    }

    if (!favorite) {
      FavPokemonCtx.addFavoritePokemon(pokemonName, pokemonUrl, pokemonType);
      setFavorite(true);
    }
  };

  return (
    <Pressable onPress={pressHandler} style={styles.container}>
      {({ pressed }) => {
        return (
          <View style={[pressed ? { opacity: 1000 } : { opacity: 1 }]}>
            {!favorite ? (
              <FontAwesome name="star-o" size={24} color={"black"} />
            ) : (
              <FontAwesome name="star" size={24} color={"black"} />
            )}
          </View>
        );
      }}
    </Pressable>
  );
};

export default FavoriteBtn;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});
