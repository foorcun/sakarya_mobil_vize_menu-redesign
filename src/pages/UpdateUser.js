import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from "react-native";

import Mytext from "./components/Mytext";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const UpdateUser = ({ navigation }) => {
  let [inputMenuId, setInputMenuId] = useState("");
  let [menuName, setMenuName] = useState("");
  let [menuContent, setMenuContent] = useState("");
  let [menuPrice, setMenuPrice] = useState("");

  let updateAllStates = (name, contact, address) => {
    setMenuName(name);
    setMenuContent(contact);
    setMenuPrice(address);
  };

  let searchMenu = () => {
    console.log(inputMenuId);
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_menu where menu_id = ?",
        [inputMenuId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.menu_name, res.menu_content, res.menu_price);
          } else {
            alert("Menu not found!");
            updateAllStates("", "", "");
          }
        }
      );
    });
  };
  let updateMenu = () => {
    console.log(inputMenuId, menuName, menuContent, menuPrice);

    if (!inputMenuId) {
      alert("Kod!");
      return;
    }
    if (!menuName) {
      alert("Ad SOyad !");
      return;
    }
    if (!menuContent) {
      alert("Telefon !");
      return;
    }
    if (!menuPrice) {
      alert("Adres !");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE table_menu set menu_name=?, menu_content=? , menu_price=? where menu_id=?",
        [menuName, menuContent, menuPrice, inputMenuId],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "Menu updated successfully !!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Error updating menu");
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: "space-between" }}
            >
              <Mytext text="Menu Filter" />
              <Mytextinput
                placeholder="Menü kodunu giriniz"
                style={{ padding: 10 }}
                onChangeText={(inputMenuId) => setInputMenuId(inputMenuId)}
              />
              <Mybutton title="Menü bul" customClick={searchMenu} />
              <Mytextinput
                placeholder="Menü adı giriniz"
                value={menuName}
                style={{ padding: 10 }}
                onChangeText={(menuName) => setMenuName(menuName)}
              />

              <Mytextinput
                value={menuContent}
                placeholder="İçerik giriniz"
                onChangeText={(menuContent) => setMenuContent(menuContent)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: "top", padding: 10 }}
              />
              <Mytextinput
                placeholder="Ücret giriniz"
                value={"" + menuPrice}
                onChangeText={(menuPrice) => setMenuPrice(menuPrice)}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mybutton title="Menü güncelle" customClick={updateMenu} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;
