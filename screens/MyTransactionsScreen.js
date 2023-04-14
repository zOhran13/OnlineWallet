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
        <View style={styles.transactionContainer} key={transaction.id}>
          <Pressable
            style={styles.transactionContainer}
            onPress={() => handlePress(transaction.id)}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../assets/images/red_arrow.png")}
              />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.text}>{transaction.title}</Text>
              <Text>{transaction.date}</Text>
              <Text>
                {transaction.amount} {transaction.currency}
              </Text>
            </View>
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
    padding: 10,
  },
  transactionContainer: {
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#FFC021",
    padding: 10,
    width: "90%",
    marginBottom: 10,
    flexDirection: "row",
  },
  imageContainer: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default MyTransactionsScreen;
