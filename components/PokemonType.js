import { pokemonTypesColor } from "../data/pokemonTypes";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";

const ScreenWidth = Dimensions.get("window").width;

const PokemonType = (props) => {
  const type = props.type;

  return (
    <View style={[styles.typeContainer]}>
      <Pressable onPress={props.onPress}>
        {({ pressed }) => {
          return (
            <View
              style={[
                styles.insideTypeContainer,
                { backgroundColor: pokemonTypesColor[type] },
                pressed ? { opacity: 0.5 } : { opacity: 1 },
              ]}
            >
              <Text style={styles.typeText}>
                {type[0].toUpperCase() + type.substring(1)}
              </Text>
            </View>
          );
        }}
      </Pressable>
    </View>
  );
};

export default PokemonType;

const styles = StyleSheet.create({
  typeContainer: {
    width: ScreenWidth / 3,
    height: ScreenWidth / 3,
    marginBottom: 20,
  },
  insideTypeContainer: {
    height: "100%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 8,
    elevation: 8, // this property is only for Android
  },
  typeText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  btnClicked: { opacity: "0.9" },
});
