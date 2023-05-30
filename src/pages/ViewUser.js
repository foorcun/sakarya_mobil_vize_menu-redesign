import React, { useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import Mytext from "./components/Mytext";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  let [inputMenuId, setInputMenuId] = useState("");
  let [menuData, setMenuData] = useState({});

  let searchMenu = () => {
    console.log(inputMenuId);
    setMenuData({});
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_menu where menu_id = ?",
        [inputMenuId],
        (tx, results) => {
          var len = results.rows.length;
          console.log("len", len);
          if (len > 0) {
            setMenuData(results.rows.item(0));
          } else {
            alert("Menu not found !");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Menu Filter" />
          <Mytextinput
            placeholder="Enter Code"
            onChangeText={(inputMenuId) => setInputMenuId(inputMenuId)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Search Menu" customClick={searchMenu} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10,
            }}
          >
            <Text>Code : {menuData.menu_id}</Text>
            <Text>Menü Adı : {menuData.menu_name}</Text>
            <Text>Menü içerği : {menuData.menu_content}</Text>
            <Text>Menü price : {menuData.menu_price} TL</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;
