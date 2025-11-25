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

export const setStoragePoints = async (value: PointsType) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("point-key", jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getStoragePoints = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("point-key");
    if (jsonValue != null) {
      const updatedJson = JSON.parse(jsonValue);
      return updatedJson;
    }
  } catch (e) {
    // error reading value
  }
};