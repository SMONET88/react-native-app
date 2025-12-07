import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function usePoints() {
  const [points, setPoints] = useState<string>('1');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("points");
      if (isNaN(Number(saved))) {
        console.log("No points found!!");
        await AsyncStorage.setItem("points", '1');
      } else {
        setPoints(saved);
      };
    })();
  }, []);

  const updatePoints = async (newPoints: string) => {
    setPoints(newPoints);
    console.log(`updating points: ${newPoints}`);
    await AsyncStorage.setItem("points", newPoints);
  };

  return [points, updatePoints] as const;
}
