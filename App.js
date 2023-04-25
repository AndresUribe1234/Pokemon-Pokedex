import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import PokemonTypeScreen from "./screens/PokemonTypeScreen";
import Colors from "./constants/color";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <PokemonTypeScreen />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundAppColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
