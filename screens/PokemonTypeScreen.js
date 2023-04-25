import { View, StyleSheet, ScrollView, Text, Image } from "react-native";
import { pokemonTypes } from "../data/pokemonTypes";
import Colors from "../constants/color";
import PokemonType from "../components/PokemonType";

const PokemonTypeScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Pokedex</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png",
          }}
          style={styles.image}
        />
      </View>
      <ScrollView>
        <View style={styles.typeContainer}>
          {pokemonTypes.map((ele, index) => (
            <PokemonType type={ele} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PokemonTypeScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", padding: 20, gap: 10 },
  typeContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.backgroundAppColor,
    alignItems: "center",
    justifyContent: "center",
    columnGap: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 2,
    padding: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
