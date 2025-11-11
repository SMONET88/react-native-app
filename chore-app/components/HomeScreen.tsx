import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.centeredText}>Welcome to the Pond's Chore App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf3f6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredText: {
    textAlign: "center", // centers text inside its own box
    fontSize: 30,
  },
});

export default HomeScreen;
