import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Colors from "../constants/color";

PokemonDetailScreen = (props) => {
  const navigation = useNavigation();
  const router = useRoute();
  const pokemon = router.params.pokemon;
  const [pokemonInformation, setPokemonInformation] = useState("");
  const [fetchingData, setFetchingData] = useState(true);
  const [pokemonSpeciesUrl, setPokemonSpeciesUrl] = useState("");
  const [pokemonSpeciesInformation, setPokemonSpeciesInformation] =
    useState("");
  const [pokemonEvolutionChainUrl, setPokemonEvolutionChainUrl] = useState("");
  const [
    pokemonEvolutionChainInformation,
    setPokemonEvolutionChainInformation,
  ] = useState("");

  const [pokemonEvolutionArray, setEvolutions] = useState("");

  useEffect(() => {
    navigation.setOptions({
      title: `${pokemon[0].toUpperCase() + pokemon.substring(1)}`,
    });
  }, [navigation, pokemon]);

  const getPokemonInformation = async (url) => {
    try {
      console.log("type inside fetch", url);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      let data = await response.json();

      if (response.status === 200) {
        setPokemonInformation(data);
        setPokemonSpeciesUrl(data.species.url);
        setFetchingData(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPokemonInformation(pokemon);
  }, []);

  const getPokemonSpeciesInformation = async (url) => {
    try {
      console.log("type inside fetch", url);
      const response = await fetch(url);
      let data = await response.json();

      if (response.status === 200) {
        console.log("succes api call!");
        setPokemonSpeciesInformation(data);
        setPokemonEvolutionChainUrl(data.evolution_chain);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (pokemonSpeciesUrl !== "") {
      console.log("run second api");
      getPokemonSpeciesInformation(pokemonSpeciesUrl);
    }
  }, [pokemonSpeciesUrl]);

  function getEvolutions(chain, evolutions = []) {
    const speciesName = chain.species.name;
    evolutions.push(speciesName);
    if (chain.evolves_to.length > 0) {
      for (let i = 0; i < chain.evolves_to.length; i++) {
        getEvolutions(chain.evolves_to[i], evolutions);
      }
    }
    return evolutions;
  }

  const getPokemonEvolutionInformation = async (url) => {
    try {
      console.log("type inside fetch", url);
      const response = await fetch(url);
      let data = await response.json();

      if (response.status === 200) {
        console.log("Success on third api call!");
        setPokemonEvolutionChainInformation(data);
        console.log(getEvolutions(data.chain));
        setEvolutions(getEvolutions(data.chain));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (pokemonEvolutionChainUrl !== "") {
      console.log("run third api");
      getPokemonEvolutionInformation(pokemonEvolutionChainUrl.url);
    }
  }, [pokemonEvolutionChainUrl]);

  return (
    <View style={styles.screen}>
      {fetchingData && <Spinner />}
      {!fetchingData && (
        <View style={styles.sectionContainer}>
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
          <View style={styles.informationContainer}>
            <ScrollView>
              <View style={styles.placeholderContainer}>
                <Text>Type</Text>
                <View style={styles.typeContainer}>
                  {pokemonInformation.types.map((ele) => (
                    <Text>{ele.type.name}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.placeholderContainer}>
                <Text>Stats</Text>
                <View style={styles.statsContainer}>
                  {pokemonInformation.stats.map((ele, index) => (
                    <Text
                      key={index}
                    >{`${ele.stat.name} ${ele.base_stat}`}</Text>
                  ))}
                </View>
              </View>
              {pokemonEvolutionArray && (
                <View style={styles.placeholderContainer}>
                  <Text>Evolutions</Text>
                  <View style={styles.statsContainer}>
                    {pokemonEvolutionArray.map((ele, index) => (
                      <Text key={index}>{ele}</Text>
                    ))}
                  </View>
                </View>
              )}
              {pokemonSpeciesInformation && (
                <View style={styles.placeholderContainer}>
                  <Text>Capture Rate</Text>
                  <Text>{`${(
                    (pokemonSpeciesInformation.capture_rate / 255) *
                    100
                  ).toFixed(1)}% (${
                    pokemonSpeciesInformation.capture_rate
                  }/255)`}</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default PokemonDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
  sectionContainer: { flex: 1, alignItems: "center" },
  imageContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: Colors.sectionLineBreakColor,
  },
  image: { height: "100%", width: "100%", resizeMode: "contain" },
  informationContainer: {
    flex: 1,
    width: "100%",
  },
  placeholderContainer: {
    backgroundColor: Colors.sectionLineBreakColor,
    alignItems: "center",
    marginBottom: 30,
    gap: 10,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  typeContainer: { flexDirection: "row", gap: 20 },
});
