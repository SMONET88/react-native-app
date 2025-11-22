import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { lightTheme } from "../theme";

const tableData = {
  tableHead: ["Roomie", "Chore", "Points"],
  tableData: [
    ["Bridget", "chorehere", "0"],
    ["Ellie", "chorehere", "0"],
    ["Isabelle", "chorehere", "0"],
    ["Kate", "chorehere", "0"],
    ["Maggie", "chorehere", "0"],
    ["Sam", "chorehere", "0"],
  ],
};

const BoardScreen = () => {
  const [data, setData] = useState(tableData);
  return (
    <View style={[styles.container, { backgroundColor: lightTheme.colors.primary }]}>
      <Table borderStyle={{ borderWidth: 4, borderColor: lightTheme.colors.border }}>
        <Row
          data={data.tableHead}
          style={styles.head}
          textStyle={styles.headText}
        />
        <Rows data={data.tableData} textStyle={styles.text} />
      </Table>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  head: { height: 44, backgroundColor: 'grey' },
  headText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: lightTheme.colors.secondary,
  },
  text: { margin: 6, fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
export default BoardScreen;
