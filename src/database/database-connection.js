import * as SQLite from "expo-sqlite";

// Sqlite veritabanına bağlanmak
export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
};
