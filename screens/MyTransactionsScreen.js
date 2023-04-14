import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { BackHandler } from "react-native";

const MyTransactionsScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([
    {
      id: 5,
      title: "Matija Kokor",
      date: "11.04.2023",
      amount: 2.05,
      currency: "BAM",
    },
    {
      id: 6,
      title: "Matija Kokor",
      date: "11.04.2023",
      amount: 2.05,
      currency: "BAM",
    },
  ]);
  const [userId, setUserId] = useState("");

  const niz = [
    {
      id: 5,
      username: "Matija Kokor",
      date: "11.04.2023",
      amount: 2.05,
    },
    {
      id: 6,
      username: "Matija Kokor",
      date: "11.04.2023",
      amount: 2.05,
    },
  ];

  useEffect(() => {
    /*const fetchUserId = async () => {
      xid = await User.getUserDetails();
      setUserId(xid.id);
      const data = await gettransactions(xid.id);
      settransactions(data);
    };
    fetchUserId();*/

    const backAction = () => {
      navigation.navigate("Home");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handlePress = (id) => {
    navigation.navigate("TransactionDetails", { id });
  };

  return (
    <View style={styles.container}>
      {transactions.map((transaction) => (
        <View style={styles.container1} key={transaction.id}>
          <Pressable onPress={() => handlePress(transaction.id)}>
            <Text style={styles.text}>{transaction.title}</Text>
            <Text>{transaction.date}</Text>
            <Text>
              {transaction.amount} {transaction.currency}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1938",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    marginTop: 0,
  },
  listtransactionsButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: "2%",
    width: "50%",
    padding: 20,
    backgroundColor: "#FFC021",
  },
  transactionButtonContainer: {
    width: "100%",
    alignItems: "center",
    padding: 7,
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#FFC021",
    padding: 10,
    width: "80%",
    marginBottom: 10,
  },
});

export default MyTransactionsScreen;
