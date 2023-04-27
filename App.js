import { StatusBar } from "expo-status-bar";
import PokemonTypeScreen from "./screens/PokemonTypeScreen";
import Colors from "./constants/color";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PokemonTypeDetailScreen from "./screens/PokemonTypeDetailScreen";
import PokemonDetailScreen from "./screens/PokemonDetailScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SearchScreen from "./screens/SearchScreen";
import { useRoute } from "@react-navigation/native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name={"Pokedex"} options={{ headerShown: false }}>
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Pokedex two"
                  component={PokemonTypeScreen}
                />
                <Stack.Screen
                  name="Pokemon by type"
                  component={PokemonTypeDetailScreen}
                />
                <Stack.Screen
                  name="Pokemon detail"
                  component={PokemonDetailScreen}
                />
              </Stack.Navigator>
            )}
          </Drawer.Screen>
          <Drawer.Screen name={"Pokemon Search"} component={SearchScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
