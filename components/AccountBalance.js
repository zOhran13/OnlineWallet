import React, { useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const AccountBalance = () => {
  const [balance, setBalance] = useState(1000);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.elipseContainer}>
          <Text style={styles.balanceText}>Total balance</Text>
          <Text style={styles.balanceValueText}>BAM {balance}</Text>
        </View>

        <View>
          <Image
            source={require("../assets/images/WalletPicture.png")}
            style={styles.picture}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: "space-evenly",
    position: "absolute",
    top: "15%",
    width: "85%",
    height: "30%",
  },
  picture: {},
  balanceText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    padding: 5,
  },
  balanceValueText: {
    color: "white",
    fontSize: 20,
    fontWeight: "normal",
    padding: 5,
  },
  balanceValueComponent: {
    borderColor: "black",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#312e66",
    padding: 30,
  },
  elipseContainer: {
    borderColor: "black",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#312e66",
    padding: 30,
  },
});

export default AccountBalance;
