import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Colors from "../constants/color";
import { useEffect, useState } from "react";
import { pokemonTypesColor } from "../data/pokemonTypes";

const PokemonElement = (props) => {
  const [pokemonInformation, setPokemonInformation] = useState("");
  const [fetchingData, setFetchingData] = useState(true);
  const pokemonAPIEndpoing = props.url;
  let pokemonName = props.pokemonName;
  pokemonName = pokemonName.replace(/-/g, " ");
  pokemonName = pokemonName[0].toUpperCase() + pokemonName.substring(1);

  const getPokemonInformation = async (url) => {
    try {
      console.log("type inside fetch", url);
      const response = await fetch(url);
      let data = await response.json();

      if (response.status === 200) {
        setPokemonInformation(data);
        setFetchingData(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPokemonInformation(pokemonAPIEndpoing);
  }, []);

  console.log(pokemonInformation.types);

  const pressHandler = () => {
    console.log(`${pokemonName} was pressed!`);
  };

  return (
    <Pressable onPress={pressHandler}>
      {({ pressed }) => {
        return (
          <View
            style={[
              styles.pokemonContainer,
              pressed ? { opacity: 0.5 } : { opacity: 1 },
            ]}
          >
            <View style={styles.pokemonInformationContainer}>
              <Text>{pokemonName}</Text>
              {!fetchingData && (
                <View style={styles.pokemonTypesContainer}>
                  {pokemonInformation.types.map((ele, index) => {
                    const type = ele.type.name;
                    const typeText = type[0].toUpperCase() + type.substring(1);
                    return (
                      <View
                        key={index}
                        style={[
                          styles.typeContainer,
                          { backgroundColor: pokemonTypesColor[type] },
                        ]}
                      >
                        <Text style={styles.typeText}>{typeText}</Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
            {!fetchingData && (
              <View style={styles.imageContainer}>
                {pokemonInformation?.sprites?.front_default ? (
                  <Image
                    source={{
                      uri: pokemonInformation?.sprites?.front_default,
                    }}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={require("../assets/images/pokeball.png")}
                    style={styles.image}
                  />
                )}
              </View>
            )}
          </View>
        );
      }}
    </Pressable>
  );
};

export default PokemonElement;

const styles = StyleSheet.create({
  pokemonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 12,
    backgroundColor: Colors.sectionLineBreakColor,
    borderRadius: 4,
  },
  pokemonInformationContainer: { gap: 10 },
  imageContainer: { height: 60, width: 60 },
  image: { height: "100%", width: "100%" },
  pokemonTypesContainer: { flexDirection: "row", gap: 10 },
  typeContainer: { padding: 4, borderRadius: 4, minWidth: 70 },
  typeText: { color: "white", textAlign: "center" },
});
