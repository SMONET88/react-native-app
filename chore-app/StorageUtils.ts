import AsyncStorage from "@react-native-async-storage/async-storage";
import { WeeklyChoreType } from "./components/ChoreScreen";

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

type DuckType = {
  Bridget: number;
  Ellie: number;
  Isabelle: number;
  Sam: number;
  Kate: number;
  Maggie: number;
};

export const getStorageDucks = async () => {
    try {
      const stored = await AsyncStorage.getItem("duckCounts");
      if (stored) {
        return JSON.parse(stored);
      }
      return '0' ;
    } catch (error) {
      console.error("Error retrieving ducks:", error);
      return '0';
    }
  };

  
  export const setStorageDucks = async (duckArray: DuckType) => {
    try {
      
      await AsyncStorage.setItem("duckCounts", JSON.stringify(duckArray));
    } catch (error) {
      console.error("Error saving ducks:", error);
    }
  };
