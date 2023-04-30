import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ToastAndroid,
} from "react-native";

import * as SecureStore from 'expo-secure-store';
const EmailOrPhoneVerificationScreen = ({ navigation, route }) => {
  const [code, setCode] = useState("");
  const saveCode = (text) => {
    setCode(text);
  };
  const verifyCode = () => {
    if (code.trim().length === 0) {
      ToastAndroid.show("Code can't be blank", ToastAndroid.SHORT);
      return false;
    }
    return true
  };

  const requestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: route.params.emailOrPhoneVar,
      code: code,
      method: route.params.method
    }),
  };

    const setTokenFunction = async (token) => {
        console.log(token)
    await SecureStore.setItem("secure_token", token)
    ToastAndroid.show("Welcome", ToastAndroid.SHORT);
  }

  


  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Verify-code</Text>
        <Text style={styles.bodyText}>
          Enter the confirmation code, sent to your phone number or email, to complete the
          verification.
        </Text>
        <TextInput
          style={styles.inputText}
          placeholder="Enter code"
          placeholderTextColor={"#CADAFF73"}
          keyboardType="number-pad"
          onChangeText={(text) => {
            console.log(text);
            saveCode(text);
          }}
        />
        <Pressable
          style={styles.verifyButton}
          title="Verify"
          onPress={() => {
            if (verifyCode()) {
              let requestOption = {}
              if(route.params.option == "phone") {
                 requestOption = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    phone: route.params.emailOrPhoneVar,
                    code: code,
                    method: route.params.method
                  }),
                };
              } else {
                requestOption = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: route.params.emailOrPhoneVar,
                    code: code,
                    method: route.params.method
                  }),
                };
              }
              
              console.log(requestOption.body)
              fetch(
                "http://siprojekat.duckdns.org:5051/api/User/otc/activate",
                requestOption
              )
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  if (data.token != null) {
                    ToastAndroid.show("Login confirmed. Welcome!", ToastAndroid.SHORT);
                    setTokenFunction(data.token)
                    navigation.navigate("Home");
                  } else {
                    ToastAndroid.show("Something went wrong while logging in", ToastAndroid.SHORT);
                  }
                })
                .catch((err) => {
                  ToastAndroid.show("Something went wrong while logging in", ToastAndroid.SHORT);
                });
            };

          }}
        >
          <Text style={styles.verifyText}>VERIFY</Text>
        </Pressable>

        <Pressable
          style={styles.resendCode}
          title="SendToPhone"
          onPress={() => {
            console.log("Moji paramas. " + route.params.method)
          }}
        >
          <Text style={styles.resendCode}> Resend </Text>
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
    width: "90%",
    height: "50%",
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
    width: "78%",
    height: 45,
    textAlign: "center",
    borderRadius: 20,
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

  resendCode: {
    color: "#00D8FF",
    fontSize: 14,
    marginTop: 7,
    letterSpacing: 1,
  },
});

export default EmailOrPhoneVerificationScreen;
