import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { lightTheme } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PointsType } from "../App";
import { getStorageChores, setStorageChores } from "../StorageUtils";

export type NameType =
  | "Bridget"
  | "Ellie"
  | "Isabelle"
  | "Sam"
  | "Kate"
  | "Maggie";
export type WeeklyChoreType = {
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

type ChoreScreenProps = {
  points: PointsType;
  onUpdatePoints: (newPoints: PointsType) => void;
};

const ChoreScreen = ({ points, onUpdatePoints }: ChoreScreenProps) => {
  const [pressedName, setPressedName] = useState<string>("");
  const [isPressed, setIsPressed] = useState(false);
  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(false);
  const [weeklyChores, setWeeklyChores] =
    useState<WeeklyChoreType>(startingObj);
  const length = Object.keys(weeklyChores).length;
  const [isSunday, setIsSunday] = useState(false);
  const [dateForModal, setDateForModal] = useState("");
  const [dateForUpdate, setDateForUpdate] = useState("");

  const [modalChore, setModalChore] = useState<string>("");

  const getToken = async () => {
    try {
      const stored = await SecureStore.getItemAsync("zohoToken");
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  };

  const handlePress = async (name: String) => {
    setPressedName(String(name));
    setIsPressed(true);
    console.log(`pressed ${name}`);

    const choreList = await getStorageChores();

    for (const n in choreList) {
      if (name === n) {
        const oneChore = choreList[n as NameType];
        setModalChore(oneChore);
      }
    }
  };

  const updateCalendar = async () => {
    const token = await getToken();
    const formData = new FormData();

    formData.append(
      "eventdata",
      JSON.stringify({
        dateandtime: {
          timezone: "America/Chicago",
          start: `${dateForUpdate}`,
          end: `${dateForUpdate}`,
        },
        isallday: true,
        title: `${pressedName} chore completed`,
        color: "#E574B0",
      }),
    );
    try {
      const response = await fetch(
        `https://calendar.zoho.com/api/v1/calendars/${process.env.EXPO_PUBLIC_CAL_ID}/events`,
        {
          method: "POST",
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
          },
          body: formData,
        },
      );
      if (response.ok) {
        console.log(await response.json());
        console.log(`EVENT HAS BEEN CREATED`);
      } else {
        console.log(
          "Failed to create event",
          response.status,
          await response.text(),
        );
      }
    } catch (error) {
      console.log(`Error created event. ${error}`);
      console.error(error);
    }
  };

  const handlePoints = (newPoints: PointsType) => {
    onUpdatePoints(newPoints);
  };

  const handleYesNo = async (value: string) => {
    if (value === "yes") {
      console.log(`yes pressed`);

      const updatedPoints = {
        ...points,
        [pressedName as NameType]: points[pressedName as NameType] + 1,
      };
      handlePoints(updatedPoints);
      await updateCalendar();
    } else if (value === "no") {
      setIsPressed(false);
    }
  };

  useEffect(() => {
    const assignChores = async () => {
      const chores = [
        "Dishwasher",
        "Sweep/Surfaces",
        "Trash/Recycling",
        "Dishwasher",
        "Sweep/Surfaces",
        "Trash/Recycling",
      ];
      const updated: WeeklyChoreType = { ...startingObj };

      for (const key in updated) {
        const randomIndex = Math.floor(Math.random() * chores.length);
        updated[key as NameType] = chores[randomIndex];
      }

      setWeeklyChores(updated);
      await setStorageChores(updated);

      const stored = await getStorageChores();
      console.log("Weekly chores from storage:", stored);
    };
    if (isSunday) {
      assignChores();
    }
  }, [isSunday]);

  useEffect(() => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const weekday = today.getDay();

    setDateForModal(`${month}-${date}-${year}`);
    setDateForUpdate(`${year}${month}${date}`);

    getStorageChores();
    // if (weekday === 0){
    setIsSunday(false);
    // }
  }, []); // run once on mount

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: lightTheme.colors.primary },
        ]}
      >
        <FlatList
          data={[
            { key: "Bridget" },
            { key: "Ellie" },
            { key: "Isabelle" },
            { key: "Kate" },
            { key: "Maggie" },
            { key: "Sam" },
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
              <Text style={styles.modalText}>Chores for {dateForModal}: </Text>
              <Text style={styles.modalText}>{modalChore}</Text>
              <View style={styles.yesNoRow}>
                <Pressable
                  style={styles.yesNoButton}
                  onPress={() => handleYesNo("yes")}
                >
                  <Text>Yes</Text>
                </Pressable>
                <Pressable
                  style={styles.yesNoButton}
                  onPress={() => handleYesNo("no")}
                >
                  <Text>No</Text>
                </Pressable>
              </View>
              <Pressable onPress={() => setIsPressed(false)}>
                <Text style={[styles.textStyle, { marginTop: 18 }]}>
                  Hide Modal
                </Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingTop: 150,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
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
    margin: 10,
    gap: 10,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  yesNoRow: {
    flexDirection: "row", // put children side by side
    justifyContent: "center", // center them horizontally
    alignItems: "center", // align vertically
    gap: 16, // spacing between buttons (RN 0.71+)
    // if gap not supported, use marginRight on the first button
  },
  yesNoButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});

export { ChoreScreen, setStorageChores, getStorageChores };
