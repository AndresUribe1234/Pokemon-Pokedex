import { View, Text, StyleSheet, Image } from "react-native";
import SearchBarPokemon from "../components/SearchBar";

const SearchScreen = () => {
  return (
    <View style={styles.screen}>
      <View style={[styles.imageContainer]}>
        <Image
          source={require("../assets/images/pokeball.png")}
          style={styles.image}
        />
      </View>
      <SearchBarPokemon />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", padding: 20, gap: 20 },
  imageContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 30,
  },
  image: { height: "100%", width: "100%", resizeMode: "contain" },
});
