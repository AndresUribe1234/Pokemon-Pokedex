import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { allPokemonList } from "../data/pokemonTypes";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchBarPokemon = (props) => {
  const data = allPokemonList;
  const navigation = useNavigation();
  const [enteredInputValue, setEnteredInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const onSelect = (item) => {
    console.log(`${item} was selected!`);
    setShowAutocomplete(false);
    navigation.navigate("Pokemon detail", { pokemon: item });
    setEnteredInputValue("");
  };

  const handleInputChange = (text) => {
    // Filter list of pokemon with arrat method
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    // Show autocomplete
    setShowAutocomplete(true);
    // Set list of options to display on flatlist
    setFilteredData(filtered);
    // Set search value to match whats inside input component
    setEnteredInputValue(text);

    if (text === "") {
      setShowAutocomplete(false);
    }
  };

  const handleSelectItem = (item) => {
    setEnteredInputValue(item);
    onSelect(item);
  };

  const renderSuggestion = ({ item }) => (
    <Pressable onPress={handleSelectItem.bind(this, item)}>
      {({ pressed }) => {
        return (
          <View
            style={[
              styles.suggestionItem,
              pressed ? { backgroundColor: "lightgrey" } : "",
            ]}
          >
            <Text>{item}</Text>
          </View>
        );
      }}
    </Pressable>
  );

  const pokemonNavigateHandler = () => {
    if (allPokemonList.includes(enteredInputValue)) {
      navigation.navigate("Pokemon detail", { pokemon: enteredInputValue });
      setEnteredInputValue("");
    } else {
      console.log("Pokemon doesnt exist");
      Alert.alert("Error", "Pokemon you tried to search for does not exist!", [
        {
          text: "Understood",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          value={enteredInputValue}
          placeholder="Search for a pokemon"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable onPress={pokemonNavigateHandler}>
          {({ pressed }) => {
            return (
              <View
                style={
                  pressed
                    ? { opacity: 0.5, backgroundColor: "lightgrey" }
                    : { opacity: 1 }
                }
              >
                <Feather name="search" size={24} color={"#ccc"} />
              </View>
            );
          }}
        </Pressable>
      </View>
      {filteredData.length > 0 && showAutocomplete && (
        <FlatList
          data={filteredData}
          renderItem={renderSuggestion}
          keyExtractor={(item, index) => index.toString()}
          style={styles.suggestionList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    width: "70%",
  },
  searchContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
    borderRadius: 4,
    borderRadius: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    height: 40,
  },
  suggestionList: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    maxHeight: 300,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default SearchBarPokemon;
