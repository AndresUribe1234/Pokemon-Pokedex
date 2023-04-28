import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { FavoritePokemonContext } from "../store/favorites-context";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/color";
import { pokemonTypesColor } from "../data/pokemonTypes";

const FavoritePokemonScreen = () => {
  const FavPokemonCtx = useContext(FavoritePokemonContext);
  const [pokemonArray, setPokemonArray] = useState(
    FavPokemonCtx.favoritePokemon
  );
  navigator = useNavigation();

  useEffect(() => {
    setPokemonArray(FavPokemonCtx.favoritePokemon);
  }, [FavPokemonCtx.favoritePokemon]);

  const pressHandler = (pokemon) => {
    navigator.navigate("Pokemon detail", { pokemon: pokemon });
  };

  return (
    <View style={styles.screen}>
      {pokemonArray.length < 1 && (
        <Text>User has no favorite pokemon at the moment</Text>
      )}
      {pokemonArray.length >= 1 && (
        <>
          <Text
            style={styles.titleText}
          >{`Total: ${pokemonArray.length} favorite pokemon`}</Text>
          <ScrollView>
            {pokemonArray.map((ele, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={pressHandler.bind(this, ele.pokemonName)}
                  style={styles.pressableContainer}
                >
                  {({ pressed }) => {
                    return (
                      <View
                        style={[
                          styles.pokemonContainer,
                          pressed ? { opacity: 0.5 } : { opacity: 1 },
                        ]}
                      >
                        <View style={styles.pokemonInformation}>
                          <Text>
                            {ele.pokemonName[0].toUpperCase() +
                              ele.pokemonName.substring(1)}
                          </Text>
                          <View style={styles.typeContainer}>
                            {ele.typeArray.map((ele, index) => (
                              <Text
                                key={index}
                                style={[
                                  styles.typeText,
                                  {
                                    backgroundColor:
                                      pokemonTypesColor[ele.type.name],
                                  },
                                ]}
                              >
                                {ele.type.name[0].toUpperCase() +
                                  ele.type.name.substring(1)}
                              </Text>
                            ))}
                          </View>
                        </View>
                        <View style={styles.imageContainer}>
                          <Image
                            style={styles.image}
                            source={{
                              uri: ele.imageUrl,
                            }}
                          />
                        </View>
                      </View>
                    );
                  }}
                </Pressable>
              );
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default FavoritePokemonScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
  pressableContainer: { width: "100%", flexDirection: "row" },
  pokemonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 12,
    backgroundColor: Colors.sectionLineBreakColor,
    borderRadius: 4,
  },
  typeContainer: { flexDirection: "row", gap: 10 },
  imageContainer: { height: 60, width: 60 },
  image: { height: "100%", width: "100%" },
  titleText: { marginBottom: 10 },
  typeText: {
    color: "white",
    textAlign: "center",
    padding: 4,
    borderRadius: 4,
    minWidth: 70,
  },
  pokemonInformation: { gap: 10 },
});
