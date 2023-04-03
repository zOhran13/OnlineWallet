import React, { useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import AccountBalance from "../components/AccountBalance";
import { getTemplates } from "../modules/templatesModule";

const MyTransactionsScreen = ({ navigation }) => {
  getTemplates();
  return (
    <>
      <AccountBalance/>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderRadius: 30,
    backgroundColor: "#312e66",
    padding: 30,
    width: "80%",
    marginTop: "80%",
  },
  payButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: 150,
    padding: 20,
    backgroundColor: "#FFC021",
  },
  myTransactionsButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: 300,
    padding: 20,
    backgroundColor: "#FFC021",
    marginTop: 70,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});

export default MyTransactionsScreen;
