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

const setStorageChores = async (value: WeeklyChoreType) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("chore-list", jsonValue);
  } catch (e) {
    // saving error
  }
};


const getStorageChores = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("chore-list");
    if (jsonValue != null) {
      const updatedJson = JSON.parse(jsonValue);
      return updatedJson;
    }
  } catch (e) {
    // error reading value
  }
};




const ChoreScreen = () => {
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
  const token = SecureStore.getItemAsync("zohoToken");
  let [points, setPointData] = useState(0);

  const handlePress = (name: String) => {
    setPressedName(String(name));
    setIsPressed(true);
    console.log(`pressed ${name}`);
  };
  const handleModalPress = (bool: String) => {
    console.log(`pressed ${bool}`);
  };

  const handleYesNo = async (value: string) => {
    if (value === "yes") {
      console.log(`yes pressed`);
      
      

      try {
        const response = await fetch(
          `https://calendar.zoho.com/api/v1/calendars/${process.env.ZOHO_CALENDAR_ID}/events`,
          {
            method: "POST",
            headers: {
              Authorization: `Zoho-oauthtoken ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              eventdata: {
                title: "test invitation",
                dateandtime: {
                  timezone: "Asia/Kolkata",
                  start: "20221130T180000Z",
                  end: "20221130T183000Z",
                },
                reminders: [
                  {
                    action: "popup",
                    minutes: -60,
                  },
                ],
                attach: {
                  fileId: "1669786154601000001,1669786188806000001",
                },
                attendees: [
                  {
                    email: "user@domain.com",
                    status: "NEEDS-ACTION",
                  },
                ],
              },
            }),
          },
        );

        const data = await response.json();
        console.log("Response:", data);

        //   const response = await fetch(
        //     `https://calendar.zoho.com/api/v1/calendars/${process.env.ZOHO_CALENDAR_ID}/events`,
        //     {
        //       method: "POST",
        //       headers: {
        //         Authorization: `Zoho-oauthtoken ${token}`,
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({
        //         dateandtime: {
        //           timezone: "America/Chicago",
        //           start: "20251119",
        //           end: "20251120",
        //         },
        //         isallday: true,
        //         title: `${pressedName} chore completed`,
        //       }),
        //     },
        //   );
        // const data = await response.json();
        const isApproved = data.events?.[0]?.isApproved;
        console.log(`xx: ${JSON.stringify(data)}`);
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    } else if (value === "no") {
      console.log(`no pressed :()`);
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
              <Text style={styles.modalText}> tbd </Text>
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
