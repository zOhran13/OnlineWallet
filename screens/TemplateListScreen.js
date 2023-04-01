import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import AccountBalance from "../components/AccountBalance";

const TemplateListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Pressable
          style={styles.listTemplatesButton}
          onPress={() => navigation.navigate("Transaction")}
          //umjesto Transaction ide templejt koji zlata i naida rade
        >
          <Text style={styles.text}>Template</Text>
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1938",
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderRadius: 40,
    backgroundColor: "#FFFF00",
    padding: 50,
    width: "80%",
    marginTop: "80%",
  }
});

export default TemplateListScreen;