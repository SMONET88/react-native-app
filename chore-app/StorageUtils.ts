import AsyncStorage from "@react-native-async-storage/async-storage";
import { WeeklyChoreType } from "./components/ChoreScreen";
import { PointsType } from "./App";

export const setStorageChores = async (value: WeeklyChoreType) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("chore-list", jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getStorageChores = async () => {
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

 export const clearPointsStorage = async () => {
  try {
    await AsyncStorage.removeItem("points");
    console.log("Points storage successfully cleared.");
  } catch (e) {
    console.error("Failed to clear points storage:", e);
  }
};