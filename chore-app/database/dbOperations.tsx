import { enablePromise, openDatabase } from "react-native-sqlite-storage";

type Rows = {
    choreType: string;
    prevPerson1: string;
    prevPerson2: string;
}


// Enable promise for SQLite
enablePromise(true);

const connectToDatabase = async () => {
  return openDatabase(
    { name: "choreData.db", location: "default" },
    () => {},
    (error: any) => {
      console.error(error);
      throw Error("Could not connect to database");
    }
  );
};

const createTables = async (db: SQLiteDatabase) => {
  const choreTableQuery = `
    CREATE TABLE IF NOT EXISTS chores(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        choreType TEXT NOT NULL,
        prevPerson1 TEXT,
        prevPerson2 TEXT
    )
    `;

  try {
    await db.executeSql(choreTableQuery);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to create tables`);
  }
};

const addChores = async (db: SQLiteDatabase, chores: Rows) => {
  const insertQuery = `INSERT INTO chores (id, choreType) VALUES (? , ?);
`
    const values = [
        chores.choreType,
        chores.prevPerson1,
        chores.prevPerson2,
    ]
    try {
        return db.executeSql(insertQuery, values)
    } catch (error) {
        console.error(error)
        throw Error("Failed to add contact")
    }

};

export { connectToDatabase, createTables, addChores };
