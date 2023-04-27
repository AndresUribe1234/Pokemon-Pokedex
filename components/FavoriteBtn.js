import { Pressable, StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

const FavoriteBtn = () => {
  const [favorite, setFavorite] = useState(false);

  const pressHandler = () => {
    console.log("Added to favorite");
    setFavorite(true);
  };

  return (
    <Pressable onPress={pressHandler} style={styles.container}>
      {({ pressed }) => {
        return (
          <View style={[pressed ? { opacity: 1000 } : { opacity: 1 }]}>
            {!favorite ? (
              <FontAwesome name="star-o" size={24} color={"black"} />
            ) : (
              <FontAwesome name="star" size={24} color={"black"} />
            )}
          </View>
        );
      }}
    </Pressable>
  );
};

export default FavoriteBtn;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});
