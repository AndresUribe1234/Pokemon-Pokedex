import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";
import { pokemonTypes } from "../data/pokemonTypes";
import Colors from "../constants/color";
import PokemonType from "../components/PokemonType";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import HomeBtn from "../components/HomeBtn";
import { useNavigation } from "@react-navigation/native";

const ScreenWidth = Dimensions.get("window").width;

const PokemonTypeScreen = (props) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: `Pokedex`,
      headerLeft: () => {
        return <HomeBtn />;
      },
    });
  }, [navigation]);

  const navigateHandler = (type) => {
    props.navigation.navigate("Pokemon by type", { type: type });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.upperSection}>
        <MaterialCommunityIcons name="pokemon-go" size={30} color="black" />
        <Text style={styles.title}>Pokemon types</Text>
      </View>
      <ScrollView>
        <View style={styles.typeContainer}>
          {pokemonTypes.map((ele, index) => (
            <PokemonType
              type={ele}
              key={index}
              onPress={navigateHandler.bind(this, ele)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PokemonTypeScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", padding: 20 },
  upperSection: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Colors.sectionLineBreakColor,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    width: 200,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  typeContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 20,
  },
});
