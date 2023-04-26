import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import PokemonElement from "../components/PokemonElement";

const PokemonTypeDetailScreen = (props) => {
  const [fetchingData, setFetchingData] = useState(true);
  const [pokemon, setPokemon] = useState();
  const [numPokemon, setNumPokemon] = useState();
  const route = useRoute();
  const navigation = useNavigation();
  const type = route.params.type;

  navigation.setOptions({
    title: `${type[0].toUpperCase() + type.substring(1)} type pokemon`,
  });

  const getAllPokemonsOfType = async (type) => {
    try {
      console.log("type inside fetch", type);
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      let data = await response.json();

      data = data.pokemon.map((ele) => ele.pokemon);
      if ((response.status = 200)) {
        setPokemon(data);
        setNumPokemon(data.length);
        setFetchingData(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllPokemonsOfType(type);
  }, []);

  return (
    <View style={styles.screen}>
      {fetchingData && <Spinner />}
      {!fetchingData && (
        <View style={styles.screen}>
          <Text style={styles.titleText}>{`Total: ${numPokemon} pokemon`}</Text>
          <ScrollView>
            <View style={styles.resultsContainer}>
              {pokemon.map((ele, index) => (
                <PokemonElement
                  key={index}
                  pokemonName={ele.name}
                  url={ele.url}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default PokemonTypeDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
  resultsContainer: { flex: 1 },
  titleText: { marginBottom: 10 },
});
