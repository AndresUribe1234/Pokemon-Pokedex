import { pokemonTypesColor } from "../data/pokemonTypes";
import { View, Text, StyleSheet } from "react-native";

const PokemonType = (props) => {
  const type = props.type;

  return (
    <View
      style={[
        styles.typeContainer,
        { backgroundColor: pokemonTypesColor[type] },
      ]}
    >
      <Text style={styles.typeText}>
        {type[0].toUpperCase() + type.substring(1)}
      </Text>
    </View>
  );
};

export default PokemonType;

const styles = StyleSheet.create({
  typeContainer: {
    width: "40%",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8, // this property is only for Android
    marginBottom: 20,
  },
  typeText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
