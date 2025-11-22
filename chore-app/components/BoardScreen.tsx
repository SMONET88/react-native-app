import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { lightTheme } from "../theme";
import { getStorageChores, WeeklyChoreType } from "./ChoreScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TableChoreType = {
  name: string;
};

const tableHead = ["Roomie", "Chore"];

export default function BoardScreen() {
  const [data, setData] = useState<string[][]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const chores = await getStorageChores();
      const keys = Object.keys(chores) as string[];
      const values = Object.values(chores) as string[];
      const tableData = keys.map((key, index) => {
        const chore = values[index];
        return [key, chore];
      })
      setData(tableData);
    };
    fetchData();
  }, []);
  return (
    <View
      style={[styles.container, { backgroundColor: lightTheme.colors.primary }]}
    >
      <Table
        borderStyle={{ borderWidth: 4, borderColor: lightTheme.colors.border }}
      >
        <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
        <Rows data={data} textStyle={styles.text} />
      </Table>
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
  head: { height: 44, backgroundColor: "grey" },
  headText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: lightTheme.colors.secondary,
  },
  text: { margin: 6, fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
