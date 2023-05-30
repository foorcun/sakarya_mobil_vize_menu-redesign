import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  let [menuName, setMenuName] = useState("");
  let [menuContent, setMenuContent] = useState("");
  let [menuPrice, setMenuPrice] = useState("");

  let register_user = () => {
    console.log(menuName, menuContent, menuPrice);

    if (!menuName) {
      alert("Please fill in the name !");
      return;
    }
    if (!menuPrice) {
      alert("Please fill in the contact");
      return;
    }
    if (!menuContent) {
      alert("Please fill in the address !");
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO table_menu (menu_name, menu_content, menu_price) VALUES (?,?,?)",
        [menuName, menuContent, menuPrice],
        (tx, results) => {
          console.log(menuName, menuPrice, menuContent);
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "Successfully Registered User !!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Error trying to register User !!!");
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
              <Mytextinput
                placeholder="Menü Adı"
                onChangeText={(menuName) => setMenuName(menuName)}
                style={{ padding: 10 }}
              />

              <Mytextinput
                placeholder="Menü içeriği"
                onChangeText={(menuContent) => setMenuContent(menuContent)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: "top", padding: 10 }}
              />
              <Mytextinput
                placeholder="Ücret"
                onChangeText={(menuPrice) => setMenuPrice(menuPrice)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mybutton title="Save" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
