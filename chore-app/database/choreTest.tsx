import React, { useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { addChores, connectToDatabase, createTables } from "./dbOperations";

type rows = {
  choreType: string;
  prevPerson1: string;
  prevPerson2: string;
};

export default function ChoreTest() {
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);

      const testAdd = {
        choreType: "Dishwasher",
        prevPerson1: "Bridget",
        prevPerson2: "Isabelle",
      };

      
      await addChores(db, testAdd);

      const rows = await db.executeSql("SELECT * FROM chores");
      console.log("Rows:", rows);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    loadData();
  }, [loadData]);

  // useEffect(() => {
  //     const runDb = async () => {

  //         await db.runAsync(
  //             'UPDATE chores SET prevPerson1 = ?, prevPerson2 = ? WHERE choreType = ?',
  //             ['Bridget', 'Ellie', 'Dishwasher']
  //         );

  //         const rows: rows[] = await db.getAllAsync(
  //             'SELECT choreType, prevPerson1, prevPerson2 FROM chores'
  //         );

  //         console.log('Rows:', rows);

  //         rows.forEach(row => {
  //             console.log(`${row.choreType}: last week ${row.prevPerson1}, ${row.prevPerson2}`);
  //         });

  //         //await db.closeAsync();
  //     };

  //     runDb();
  // }, []);

  return (
    <View>
      <Text>Check your Metro console for SQLite output</Text>
    </View>
  );
}
