import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import OAuthFlow from "../database/AuthFile";
import { lightTheme, darkTheme } from "../theme";


const HomeScreen = () => {
  return (
    <View style={[ styles.container, {backgroundColor: lightTheme.colors.background}]}>
      <Text style={[styles.centeredText, {color: lightTheme.colors.primary}]}>Welcome to the Pond's Chore App</Text>
      <OAuthFlow />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredText: {
    textAlign: "center", // centers text inside its own box
    fontSize: 30,
  },
});

export default HomeScreen;
