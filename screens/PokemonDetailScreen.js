import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Colors from "../constants/color";
import { pokemonTypesColor } from "../data/pokemonTypes";
import FavoriteBtn from "../components/FavoriteBtn";

const PokemonDetailScreen = (props) => {
  const navigation = useNavigation();
  const router = useRoute();
  const [pokemon, setPokemon] = useState(router.params.pokemon);
  const [pokemonInformation, setPokemonInformation] = useState("");
  const [fetchingData, setFetchingData] = useState(true);
  const [pokemonSpeciesUrl, setPokemonSpeciesUrl] = useState("");
  const [pokemonSpeciesInformation, setPokemonSpeciesInformation] =
    useState("");
  const [pokemonEvolutionChainUrl, setPokemonEvolutionChainUrl] = useState("");
  const [pokemonEvolutionArray, setEvolutionsArray] = useState("");

  useEffect(() => {
    setPokemon(router.params.pokemon);
  }, [pokemon, router]);

  useEffect(() => {
    navigation.setOptions({
      title: `${pokemon[0].toUpperCase() + pokemon.substring(1)}`,
      headerRight: () => {
        return <FavoriteBtn />;
      },
    });
  }, [navigation, pokemon]);

  const getPokemonInformation = async (url) => {
    try {
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
  }, [pokemon]);

  const getPokemonSpeciesInformation = async (url) => {
    try {
      const response = await fetch(url);
      let data = await response.json();

      if (response.status === 200) {
        setPokemonSpeciesInformation(data);
        setPokemonEvolutionChainUrl(data.evolution_chain);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (pokemonSpeciesUrl !== "") {
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
      const response = await fetch(url);
      let data = await response.json();

      if (response.status === 200) {
        setEvolutionsArray(getEvolutions(data.chain));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (pokemonEvolutionChainUrl !== "") {
      getPokemonEvolutionInformation(pokemonEvolutionChainUrl.url);
    }
  }, [pokemonEvolutionChainUrl]);

  const pressHandler = (pokemon) => {
    console.log(`${pokemon} pressed!`);
    navigation.navigate("Pokemon detail", { pokemon: pokemon });
  };

  return (
    <View style={styles.screen}>
      {fetchingData && !pokemonEvolutionArray && <Spinner />}
      {!fetchingData && pokemonEvolutionArray && (
        <View style={styles.sectionContainer}>
          <View style={[styles.imageContainer]}>
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
                <Text style={styles.titlteText}>Type</Text>
                <View style={styles.typeContainer}>
                  {pokemonInformation.types.map((ele, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.textType,
                        { backgroundColor: pokemonTypesColor[ele.type.name] },
                      ]}
                    >
                      {ele.type.name[0].toUpperCase() +
                        ele.type.name.substring(1)}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.placeholderContainer}>
                <Text style={styles.titlteText}>Stats</Text>
                <View style={styles.statsContainer}>
                  {pokemonInformation.stats.map((ele, index) => (
                    <Text key={index}>{`${
                      ele.stat.name[0].toUpperCase() +
                      ele.stat.name.substring(1).replace("-", " ")
                    } ${ele.base_stat}`}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.placeholderContainer}>
                <Text style={styles.titlteText}>Evolutions</Text>
                <View style={styles.statsContainer}>
                  {pokemonEvolutionArray.map((ele, index) => (
                    <Pressable
                      onPress={pressHandler.bind(this, ele)}
                      key={index}
                    >
                      {({ pressed }) => {
                        return (
                          <Text
                            style={[
                              pressed ? { opacity: 0.5 } : { opacity: 1 },
                            ]}
                          >
                            {ele[0].toUpperCase() + ele.substring(1)}
                          </Text>
                        );
                      }}
                    </Pressable>
                  ))}
                </View>
              </View>
              <View style={styles.placeholderContainer}>
                <Text style={styles.titlteText}>Capture Rate</Text>
                <Text>{`${(
                  (pokemonSpeciesInformation.capture_rate / 255) *
                  100
                ).toFixed(1)}% (${
                  pokemonSpeciesInformation.capture_rate
                }/255)`}</Text>
              </View>
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
    marginBottom: 30,
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
    padding: 8,
    borderRadius: 8,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  typeContainer: { flexDirection: "row", gap: 20 },
  textType: {
    color: "white",
    padding: 4,
    borderRadius: 4,
    minWidth: 70,
    textAlign: "center",
  },
  titlteText: { fontWeight: "bold" },
});
