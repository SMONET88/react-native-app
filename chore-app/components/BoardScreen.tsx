
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { lightTheme } from "../theme";
import { getStorageChores } from "./ChoreScreen";
import usePoints from "../usePoints";


const tableHead = ["Roomie", "Chore"];

export default function BoardScreen() {
  const [data, setData] = useState<string[][]>([]);
  const [points, updatePoints] = usePoints();
  const [localPoints, setLocalPoints] = useState(points);
  

  useEffect(() => {
    const fetchData = async () => {
      const chores = await getStorageChores();
      const keys = Object.keys(chores) as string[];
      const values = Object.values(chores) as string[];
      const tableData = keys.map((key, index) => {
        const chore = values[index];
        return [key, chore];
      });
      setData(tableData);
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    setLocalPoints(points);
  }, [points]);
  

  
  


  return (
    <View
      style={[styles.container, { backgroundColor: lightTheme.colors.background }]}
    >
      <Table
        borderStyle={{ borderWidth: 4, borderColor: '#B0C4DE' }}
      >
        <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
        <Rows data={data} textStyle={styles.text} />
      </Table>
      <Text style={{ marginTop: 100, color: lightTheme.colors.secondary, fontSize: 60, fontFamily: "Gill Sans", textAlign: "center" }}>{localPoints}</Text>
      <Text style={{ marginTop: 100, color: lightTheme.colors.secondary, fontSize: 40, fontFamily: "Gill Sans", textAlign: "center" }}>House Points</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  head: { height: 44, backgroundColor: '#1E3A8A' },
  headText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: lightTheme.colors.background,
  },
  text: { margin: 6, fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
