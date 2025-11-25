import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./components/HomeScreen";
import { ChoreScreen, NameType } from "./components/ChoreScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import BoardScreen from "./components/BoardScreen";
import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { getStoragePoints, setStoragePoints } from "./StorageUtils";

type TabType = {
  Home: undefined;
  Chores: undefined;
  Leaderboard: undefined;
};

type StackType = {
  Tabs: undefined;
  Chores: undefined;
  Leaderboard: undefined;
};

export type PointsType = {
  [key in NameType]: number;
};

const startingPointObj = {
  Bridget: 0,
  Ellie: 0,
  Isabelle: 0,
  Sam: 0,
  Kate: 0,
  Maggie: 0,
};

const Stack = createNativeStackNavigator<StackType>();
const Tab = createBottomTabNavigator<TabType>();

export default function App() {
  const [points, setPoints] = useState<PointsType>({ ...startingPointObj });

  const handleUpdatePoints = async (newPoints: PointsType) => {
    await setStoragePoints(newPoints);
    setPoints(newPoints);
  };
  function Tabs() {
    useEffect(() => {
      const fetchPoints = async () => {
        const test = await getStoragePoints();
        console.log(`points: ${JSON.stringify(test)}`);
      };
      fetchPoints();
    }, [points]);
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="duck" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Chores"
          children={() => (
            <ChoreScreen points={points} onUpdatePoints={handleUpdatePoints} />
          )}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="cleaning-services" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Leaderboard"
          component={BoardScreen}
          options={{
            //children={() => (<BoardScreen props={props} />)}
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="trophy" size={24} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chores"
          children={(navProps) => (
            <ChoreScreen
              {...navProps}
              points={points}
              onUpdatePoints={handleUpdatePoints}
            />
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
