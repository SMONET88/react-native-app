// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './components/HomeScreen';
// import { ChoreScreen } from './components/ChoreScreen';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
// import BoardScreen from './components/BoardScreen';
// import { FontAwesome } from '@expo/vector-icons';

import { View } from "react-native";
import ChoreTest from "./database/choreTest";
import { useCallback, useEffect } from "react";
import { connectToDatabase, createTables } from './database/dbOperations';

// type TabType = {
//   Home: undefined;
//   Chores: undefined;
//   Leaderboard: undefined;
// };

// type StackType = {
//   Tabs: undefined;
//   Chores: undefined;
//   Leaderboard: undefined;
// };


// const Stack = createNativeStackNavigator<StackType>();
// const Tab = createBottomTabNavigator<TabType>();


// function Tabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} options={{
//         tabBarIcon: ({ color, size }) => (
//           <MaterialCommunityIcons name="duck" size={24} color="black" />
//         ),
// }}  />
//       <Tab.Screen name="Chores" component={ChoreScreen} options={{tabBarIcon: ({color, size}) => (
//         <MaterialIcons name="cleaning-services" size={24} color="black" />
//       ),}} />
//       <Tab.Screen name="Leaderboard" component={BoardScreen} options={{
//         tabBarIcon: ({ color, size }) => (
//           <FontAwesome name="trophy" size={24} color="black" />
//         ),
//       }} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Tabs"
//           component={Tabs}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="Chores" component={ChoreScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default function App() {
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase()
      await createTables(db)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])
 

  return (
    <View>
    {<ChoreTest />}
    
    </View>
  )
}
  





