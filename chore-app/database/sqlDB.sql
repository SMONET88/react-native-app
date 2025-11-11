import * as SQLite from 'expo-sqlite';



const db = await SQLite.openDatabaseAsync('choreData.db');

await db.execAsync(`
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS chores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  choreType TEXT NOT NULL,
  prevPerson1 TEXT,
  prevPerson2 TEXT
);

INSERT INTO chores (id, choreType) VALUES (1, 'Dishwasher');
INSERT INTO chores (id, choreType) VALUES (2, 'Trash');
INSERT INTO chores (id, choreType) VALUES (3, 'Surfaces/Floors');
`);


await db.runAsync(
  'UPDATE chores SET prevPerson1 = ?, prevPerson2 = ? WHERE choreType = ?',
  ['Bridget', 'Ellie', 'Dishwasher']
);


const rows = await db.getAllAsync('SELECT choreType, prevPerson1, prevPerson2 FROM chores');
rows.forEach(row => {
  console.log(`${row.choreType}: last week ${row.prevPerson1}, ${row.prevPerson2}`);
});

await db.closeAsync();

export default db;

