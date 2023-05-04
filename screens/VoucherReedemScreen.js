import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ToastAndroid,
} from "react-native";

import * as User from '../modules/userModule';

const VoucherReedemScreen = ({ navigation }) => {
  

    const [voucher, setVoucher] = useState("");
    const sendVoucher = async () => {
        var pattern = /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;
        
        if (!pattern.test(voucher)) {
            ToastAndroid.show("Invalid voucher format", ToastAndroid.SHORT);
        }
        else {
            User.redeemVoucher(voucher);
        }
    }
    

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Reedem-Voucher</Text>
        <Text style={styles.bodyText}>
          Enter the voucher below, you need to have account in vouchers currency to reedem it.
        </Text>
        <TextInput
          style={styles.inputText}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          placeholderTextColor={"#CADAFF73"}
                  onChangeText={(text) => {
                      setVoucher(text);
          }}
        />
        <Pressable
                  style={styles.verifyButton}
                  title="Reedem"
                  onPress={sendVoucher}>
          <Text style={styles.verifyText}>Reedem</Text>
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
    width: "100%",
    height: "100%",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: "45%",
    backgroundColor: "#312D65",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#645CD1",
  },
  title: {
    color: "#FFFFFF78",
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    marginBottom: 0,
  },
  bodyText: {
    color: "#CADAFFBF",
    fontSize: 18,
    display: "flex",
    textAlign: "center",
    paddingHorizontal: 32,
    marginTop: 30
  },
  inputText: {
    backgroundColor: "#23204D",
    color: "#ffffff",
    width: "90%",
    height: 45,
    textAlign: "center",
    borderRadius: 10,
    marginTop: 25,
    fontSize: 18,
  },
  verifyButton: {
    marginTop: 15,
    backgroundColor: "#FFC022",
    width: 120,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  verifyText: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },

});

export default VoucherReedemScreen;
