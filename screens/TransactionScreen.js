import React, { useState, useEffect } from "react";
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
import { getTemplate, deleteTemplate,getTemplates, update, createTemplate } from "../modules/templatesModule";

const TransactionScreen = () => {
  const [selectedTemplate, setSelectedTemplate] = useState({});

  const {params} = useRoute();
  const id = params?.id

  useEffect(() => {
    const fetchTemplate = async () => {
      const data = await getTemplate(id);
      setSelectedTemplate(data);
    };

    fetchTemplate();
  }, []);

  const selectedItem = selectedTemplate;
  console.log(selectedItem)

  const [currency, setCurrency] = useState("US Dollar");
  const [textInputTitle, setTextInputTitle] = useState("New Transaction");
  const [textInputName, setTextInputName] = useState("");
  const [textInputDescription, setTextInputDescription] = useState("");
  const [textInputNumber, setTextInputNumber] = useState("");
  const [textInputAmount, setTextInputAmount] = useState("");
  const [editableBoolean, setEditableBoolean] = useState(false);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  const handleEditPress = () => {
    setTextInputTitle(selectedItem.title);
    setTextInputName(selectedItem.recipientName)
    setTextInputNumber(selectedItem.recipientAccountNumber)
    setTextInputDescription(selectedItem.description)
    setEditableBoolean(true);
    setShowComponent(true);
    setDisableSubmitButton(true);
    Alert.alert("You are in edit mode.");
  }

  const handleDeletePress = () => {
    Alert.alert('Delete template', 'Are you sure you want to delete this template?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        console.log('OK Pressed')
        deleteTemplate(id);
      }
      },
    ]);
    
  }

  const handleSaveButton = () => {
    if(checkTextInputForSaveEdit()) {
      setEditableBoolean(false);
      setShowComponent(false);
      setDisableSubmitButton(false);
      update(id,selectedItem.userId, selectedItem.title, textInputName, textInputNumber, textInputDescription, currency)

    }
  }


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

    if(!textInputDescription.trim()) {
      alert("Please Enter Description!");
      return
    }

    //Checked Successfully
    //Do whatever you want
    Alert.alert("Transaction Successful!");
  };

  const checkTextInputForSaveEdit = () => {
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

    if(!textInputDescription.trim()) {
      alert("Please Enter Description!");
      return
    }

    return true;
  };


  const createNewTemplate = () => {
    if(checkTextInputForSaveEdit()) {
      createTemplate(3, textInputTitle, textInputName, textInputNumber, textInputDescription, currency);
    } 
    
    
  } 


    const checkAmountInput = () => {
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

    //Checked Successfully
    //Do whatever you want
    Alert.alert("Transaction Successful!");
  };


  if ( id != null) {
 // const templates = getTemplates();
      //const selectedItem = templates.find(item => item.id === id)

     
     // console.log("OVDJEEE IDD",id)

      const [recipientName, setRecipientName] = useState(selectedItem?.recipientName)
      const [recipientAccountNumber, setRecipientAccountNumber] = useState(selectedItem?.recipientAccountNumber)
      const [description, setDescription] = useState(selectedItem?.description)
      const [currencyTemplate, setCurrencyTemplate] = useState(selectedItem?.currency)
      
     
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.elipseContainer}>
          <View style={styles.saveButtonAndTransactionContainer}>
          <TextInput style={styles.newTransactionTitle} onChangeText={(value) => setTextInputTitle(value)} editable={editableBoolean}>New Transaction</TextInput>
          {
            showComponent 
            && <Pressable style={styles.saveButton} onPress={handleSaveButton}>
                <Text style={styles.saveButtonText}>SAVE</Text>
                  </Pressable>
          }
          </View>
          <View>
            <View style={styles.amountCurrencyContainer}>
              <TextInput
                style={styles.amountInput}
                placeholder="Transaction amount"
                onChangeText={(value) => setTextInputAmount(value)}
                keyboardType="phone-pad"
                placeholderTextColor="#6e749d"
              />
              <Picker
                selectedValue={selectedItem.currency}
                onValueChange={(value) => setCurrency(value)} 
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
              defaultValue={selectedItem.recipientName}
              editable={editableBoolean}
              onChangeText={(value) => setTextInputName(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Recipient account number"
              keyboardType="phone-pad"
              placeholderTextColor="#6e749d"
              editable={editableBoolean}
              defaultValue={selectedItem.recipientAccountNumber}
              onChangeText={(value) => setTextInputNumber(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="#6e749d"
              defaultValue={selectedItem.description}
              editable={editableBoolean}
              onChangeText={(value) => setTextInputDescription(value)}
            />

            <Text style={styles.selectedCurrencyText}>
              Selected: {selectedItem.currency}
            </Text>
          </View>
        </View>
        <Pressable style={styles.submitButton} onPress={checkAmountInput} disabled={disableSubmitButton}>
          <Text style={styles.text}>Submit</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
          <Pressable style={styles.editButton}  onPress= {handleEditPress}>
              <Text style={styles.text}>Edit</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress= {handleDeletePress}>
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
          <View style={styles.saveButtonAndTransactionContainer}>
          <TextInput style={styles.newTransactionTitle} onChangeText={(value) => setTextInputTitle(value)}>New Transaction</TextInput>

          <Pressable style={styles.saveButton} onPress={createNewTemplate}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </Pressable>

          </View>
  
            <View>
              <View style={styles.amountCurrencyContainer}>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Transaction amount"
                  onChangeText={(value) => setTextInputAmount(value)}
                  keyboardType="phone-pad"
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
                keyboardType="phone-pad"
                placeholderTextColor="#6e749d"
                onChangeText={(value) => setTextInputNumber(value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#6e749d"
                onChangeText={(value) => setTextInputDescription(value)}
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
  newTransactionTitle: {
    color: "#b7bace",
    fontWeight: "bold",
    marginLeft: 4,
    marginBottom: 10,
    padding: 5,
    fontSize: 38,
    width: "86%"
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
  saveButtonAndTransactionContainer: {
    flexDirection: 'row'
  },
  saveButton: {

  },
  saveButtonText: {
    color: "#FFC021",
    fontWeight: 'bold',
    fontSize: 18
  }

});

export default TransactionScreen;
