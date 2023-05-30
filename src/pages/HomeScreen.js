import React, { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import MyImageButton from "./components/MyImageButton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_menu'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_menu", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_menu(menu_id INTEGER PRIMARY KEY AUTOINCREMENT, menu_name VARCHAR(20),menu_content VARCHAR(255), menu_price REAL(10))",
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <MyImageButton
              title="Yeni Kayıt"
              btnColor="#2992C4"
              btnIcon="user-plus"
              customClick={() => navigation.navigate("Register")}
            />

            <MyImageButton
              title="Update"
              btnColor="#A45BB9"
              btnIcon="user-circle"
              customClick={() => navigation.navigate("Update")}
            />

            <MyImageButton
              title="View"
              btnColor="#F9AD29"
              btnIcon="user"
              customClick={() => navigation.navigate("View")}
            />
            <MyImageButton
              title="View All"
              btnColor="#384F62"
              btnIcon="users"
              customClick={() => navigation.navigate("ViewAll")}
            />
            <MyImageButton
              title="Delete"
              btnColor="#D1503A"
              btnIcon="user-times"
              customClick={() => navigation.navigate("Delete")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
