import React, { useState } from "react";
import { View, Alert, SafeAreaView } from "react-native";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const DeleteUser = ({ navigation }) => {
  let [inputMenuId, setInputMenuId] = useState("");

  let deleteMenu = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM  table_menu where menu_id=?",
        [inputMenuId],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "Menu Deleted Successfully !",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert("Please enter a valid menu code. !");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Please enter a valid menu code."
            onChangeText={(inputMenuId) => setInputMenuId(inputMenuId)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete Menu" customClick={deleteMenu} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;
