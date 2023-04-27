import { Pressable, StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HomeBtn = () => {
  const navigation = useNavigation();

  const pressHandler = () => {
    // navigation.navigate("Pokedex");
    navigation.toggleDrawer();
  };

  return (
    <Pressable onPress={pressHandler} style={styles.container}>
      {({ pressed }) => {
        return (
          <View
            style={[
              pressed ? { opacity: 0.5 } : { opacity: 1 },
              { flexDirection: "row" },
            ]}
          >
            <Feather name="menu" size={24} color={"black"} />
          </View>
        );
      }}
    </Pressable>
  );
};

export default HomeBtn;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});
