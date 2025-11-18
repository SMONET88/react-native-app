import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
} from "react-native";

type NameType = "Bridget" | "Ellie" | "Isabelle" | "Sam" | "Kate" | "Maggie";
type WeeklyChoreType = {
  [key in NameType]: string;
};

const startingObj = {
  Bridget: "",
  Ellie: "",
  Isabelle: "",
  Sam: "",
  Kate: "",
  Maggie: "",
};

export const ChoreScreen = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [yesChecked, setYesChecked] = useState(false);
  const [weeklyChores, setWeeklyChores] =
    useState<WeeklyChoreType>(startingObj);

  const handlePress = (name: String) => {
    setIsPressed(true);
    console.log(`pressed ${name}`);
  };
  const handleModalPress = (bool: String) => {
    console.log(`pressed ${bool}`);
  };

  if (yesChecked) {
    console.log(`yes pressed`);
  } else {
    console.log(`no pressed :()`);
  }

  const getCurrentDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return month + "-" + date + "-" + year; //format: d-m-y;
  };

  const setRandomWeeklyChores = () => {
    const chores = ["Dishwasher", "Sweep/Surfaces", "Trash/Recycling"];
    const randomIndex = Math.floor(Math.random() * chores.length);

    for (const key in startingObj) {
      key;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={[
            { key: "Bridget" },
            { key: "Ellie" },
            { key: "Isabelle" },
            { key: "Kate" },
            { key: "Maggie" },
            { key: "Sam" },
            { key: "Sara" },
          ]}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handlePress(item.key)}
              style={styles.item}
            >
              <Text>{item.key}</Text>
            </Pressable>
          )}
        />
      </View>
      {isPressed && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPressed}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setIsPressed(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Chores for {getCurrentDate()}:{" "}
              </Text>
              <Text style={styles.modalText}> {getRandomChore()}</Text>
              <Pressable onPress={() => setYesChecked(!yesChecked)}>
                <Text>Yes | No</Text>
              </Pressable>
              <Pressable onPress={() => setIsPressed(false)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // fills the whole screen
    paddingTop: 200, // optional spacing
    backgroundColor: "#ebf3f6ff",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ChoreScreen;
