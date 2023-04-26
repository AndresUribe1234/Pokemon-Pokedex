import { StatusBar } from "expo-status-bar";
import PokemonTypeScreen from "./screens/PokemonTypeScreen";
import Colors from "./constants/color";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PokemonTypeDetailScreen from "./screens/PokemonTypeDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundAppColor: Colors.backgroundAppColor },
          }}
        >
          <Stack.Screen name="Pokedex" component={PokemonTypeScreen} />
          <Stack.Screen
            name="Pokemon by type"
            component={PokemonTypeDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
