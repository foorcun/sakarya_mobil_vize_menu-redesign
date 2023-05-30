import React, { useState, useEffect } from "react";
import { FlatList, Text, View, SafeAreaView, StyleSheet } from "react-native";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM table_menu", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));

        setFlatListItems(temp);
      });
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.menu_name}
        style={{
          backgroundColor: "#EEE",
          marginTop: 20,
          padding: 30,
          borderRadius: 10,
        }}
      >
        <Text style={styles.textheader}>Menü Id</Text>
        <Text style={styles.textbottom}>{item.menu_id}</Text>

        <Text style={styles.textheader}>Menü adı</Text>
        <Text style={styles.textbottom}>{item.menu_name}</Text>

        <Text style={styles.textheader}>İçerik</Text>
        <Text style={styles.textbottom}>{item.menu_content}</Text>

        <Text style={styles.textheader}>Ücret</Text>
        <Text style={styles.textbottom}>{item.menu_price} TL</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: "#111",
    fontSize: 12,
    fontWeight: "700",
  },
  textbottom: {
    color: "#111",
    fontSize: 18,
  },
});

export default ViewAllUser;
