import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { getUsers, getUser } from "../modules/userModule";
import { submitTransaction } from "../modules/transactionModule";
import { useRoute } from '@react-navigation/native';

const TransactionScreen = () => {
  let templates = ([{
    "id": 2,
    "userId": 1,
    "title": "Plin",
    "description": "Placanje racuna za plin",
    "currency": "BAM",
    "recipientName": "sarajevoGas",
    "recipientAccountNumber": "123456"
  },
  {
    "id": 3,
    "userId": 2,
    "title": "Voda",
    "description": "Placanje racuna za vodu",
    "currency": "BAM",
    "recipientName": "vodovod",
    "recipientAccountNumber": "123457"
  },
  {
    "id": 4,
    "userId": 2,
    "title": "Struja",
    "description": "Placanje racuna za struju",
    "currency": "BAM",
    "recipientName": "elektrodistribucija",
    "recipientAccountNumber": "123457"
  }]);
  

  const {params} = useRoute();
  const id = params?.id

 /* if(id) {
    console.log(id)

    const selectedItem = templates.find(item => item.id === id)
    console.log(selectedItem.title)
    const [recipientName, setRecipientName] = useState(selectedItem?.name)

  }*/

  const [currency, setCurrency] = useState("US Dollar");
  const [textInputName, setTextInputName] = useState("");
  const [textInputNumber, setTextInputNumber] = useState("");
  const [textInputAmount, setTextInputAmount] = useState("");


  const checkTextInput = () => {
    if (!textInputAmount.trim()) {
      alert("Please Enter Amount!");
      return;
    }
    if (
      !/^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/.test(textInputAmount.trim())
    ) {
      alert("Please enter valid Amount (e.g. 123,456.78)");
      return;
    }

    if (!textInputName.trim()) {
      alert("Please Enter Name!");
      return;
    }
    if (textInputName.trim().length < 2) {
      alert("Username must have more than 2 letters");
      return;
    }

    if (!textInputNumber.trim()) {
      alert("Please Enter Account Number!");
      return;
    }
    if (!/^[0-9]+$/.test(textInputNumber.trim())) {
      alert("Please enter valid Account Number");
      return;
    }

    //Checked Successfully
    //Do whatever you want
    Alert.alert("Transaction Successful!");
  };
  if ( id != null) {
  
      const selectedItem = templates.find(item => item.id === id)

      const [recipientName, setRecipientName] = useState(selectedItem?.recipientName)
      const [recipientAccountNumber, setRecipientAccountNumber] = useState(selectedItem?.recipientAccountNumber)
      const [description, setDescription] = useState(selectedItem?.description)
      const [currencyTemplate, setCurrencyTemplate] = useState(selectedItem?.currency)
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.elipseContainer}>
          <Text style={styles.newTransactionText}>New Transaction</Text>

          <View>
            <View style={styles.amountCurrencyContainer}>
              <TextInput
                style={styles.amountInput}
                placeholder="Transaction amount"
                onChangeText={(value) => setTextInputAmount(value)}
                keyboardType="numeric"
                placeholderTextColor="#6e749d"
              />
              <Picker
                selectedValue={currencyTemplate}
                onValueChange={(currentCurrency) =>
                  setCurrency(currentCurrency)
                }
                style={styles.currencyPicker}
              >
                <Picker.Item label="BAM" value="Bosnian Mark" color="black" />
                <Picker.Item label="EUR" value="Euro" color="black" />
                <Picker.Item label="USD" value="US Dollar" color="black" />
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Recipient name"
              placeholderTextColor="#6e749d"
              value={recipientName}
              onChangeText={(value) => setTextInputName(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Recipient account number"
              keyboardType="numeric"
              placeholderTextColor="#6e749d"
              value={recipientAccountNumber}
              onChangeText={(value) => setTextInputNumber(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="#6e749d"
              value={description}
              onChangeText={(value) => setTextInputName(value)}
            />

            <Text style={styles.selectedCurrencyText}>
              Selected: {currency}
            </Text>
          </View>
        </View>
        <Pressable style={styles.submitButton} onPress={checkTextInput}>
          <Text style={styles.text}>Submit</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Pressable style={styles.editButton} onPress={checkTextInput}>
              <Text style={styles.text}>Edit</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={checkTextInput}>
            <Text style={styles.text}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
  } else {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.elipseContainer}>
            <Text style={styles.newTransactionText}>New Transaction</Text>
  
            <View>
              <View style={styles.amountCurrencyContainer}>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Transaction amount"
                  onChangeText={(value) => setTextInputAmount(value)}
                  keyboardType="numeric"
                  placeholderTextColor="#6e749d"
                />
                <Picker
                  selectedValue={currency}
                  onValueChange={(currentCurrency) =>
                    setCurrency(currentCurrency)
                  }
                  style={styles.currencyPicker}
                >
                  <Picker.Item label="BAM" value="Bosnian Mark" color="black" />
                  <Picker.Item label="EUR" value="Euro" color="black" />
                  <Picker.Item label="USD" value="US Dollar" color="black" />
                </Picker>
              </View>
  
              <TextInput
                style={styles.input}
                placeholder="Recipient name"
                placeholderTextColor="#6e749d"
                onChangeText={(value) => setTextInputName(value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Recipient account number"
                keyboardType="numeric"
                placeholderTextColor="#6e749d"
                onChangeText={(value) => setTextInputNumber(value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#6e749d"
                onChangeText={(value) => setTextInputName(value)}
              />
  
              <Text style={styles.selectedCurrencyText}>
                Selected: {currency}
              </Text>
            </View>
          </View>
          <Pressable style={styles.submitButton} onPress={checkTextInput}>
            <Text style={styles.text}>Submit</Text>
          </Pressable>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  elipseContainer: {
    borderColor: "black",
    borderRadius: 50,
    backgroundColor: "#312e66",
    padding: 20,
    margin: 3,
  },
  container: {
    flex: 1,
    backgroundColor: "#1B1938",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#23204d",
    margin: 4,
    alignItems: "stretch",
    width: "92%",
    //height: '18%',
    borderRadius: 10,
    padding: 9,
    color: "white",
  },
  amountCurrencyContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 1,
    alignItems: "center",
  },
  currencyPicker: {
    width: "40%",
    height: "10%",
    backgroundColor: "#6e749d",
    marginBottom: 5,
  },
  selectedCurrencyText: {
    color: "#6e749d",
    margin: 4,
    padding: 2,
  },
  newTransactionText: {
    color: "#b7bace",
    fontWeight: "bold",
    marginLeft: 4,
    marginBottom: 10,
    padding: 5,
    fontSize: 38,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: "50%",
    padding: "5%",
    backgroundColor: "#FFC021",
    margin: 30,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  amountInput: {
    backgroundColor: "#23204d",
    margin: 4,
    alignItems: "stretch",
    width: "57%",
    height: "85%",
    borderRadius: 10,
    padding: 9,
    color: "white",
  },
  editButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: "30%",
    padding: "1%",
    backgroundColor: "#FFC021",
    margin: 10,
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: "30%",
    padding: "5%",
    backgroundColor: "#FFC021",
    margin: 10,
  },
});

export default TransactionScreen;
