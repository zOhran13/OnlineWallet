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
import { submitTransaction } from "../modules/transactionModule";
import { useRoute } from '@react-navigation/native';
import { getTemplate, deleteTemplate,  updateTemplate, createTemplate } from "../modules/templatesModule";
import { useNavigation, StackActions } from '@react-navigation/native';
import * as User from '../modules/userModule';

import CurrencyInput from 'react-native-currency-input';
import DialogInput from 'react-native-dialog-input';


const TransactionScreen = ({ navigation }) => {
    

    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [currency, setCurrency] = useState("KM");
    const [textInputTitle, setTextInputTitle] = useState("New Transaction");
    const [textInputPaymentType, setTextInputPaymentType] = useState("")
    const [textInputName, setTextInputName] = useState("");
    const [textInputDescription, setTextInputDescription] = useState("");
    const [textInputNumber, setTextInputNumber] = useState("");
    const [textInputAmount, setTextInputAmount] = useState("");
    const [category, setCategory] = useState("");
    const [userId, setUserId] = useState("");
    const { params } = useRoute();
    const id = params?.id;

    useEffect(() => {
        const fetchUserId = async () => {
            xid = await User.getUserDetails()
            setUserId(xid.id);
        };
        fetchUserId();
    }, []);

    if (id != null) {

        
        
        useEffect(() => {
            const fetchTemplate = async () => {
                const data = await getTemplate(id);
                setSelectedTemplate(data);
            };
            fetchTemplate();
            

        }, [id]);

        useEffect(() => {
            if (selectedTemplate != null) {
                setTextInputTitle(selectedTemplate.title);
                setTextInputAmount(parseFloat(selectedTemplate.amount));
                setTextInputPaymentType(selectedTemplate.paymentType);
                setTextInputName(selectedTemplate.recipientName);
                setTextInputNumber(selectedTemplate.recipientAccountNumber);
                setTextInputDescription(selectedTemplate.description);
                setCurrency(getCurrencyTag(selectedTemplate.currency));
            }
        }, [selectedTemplate])

    }

    const handleDeletePress = () => {
        Alert.alert('Delete template', 'Are you sure you want to delete this template?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    console.log('OK Pressed')
                    deleteTemplate(id);

                    navigation.dispatch(StackActions.replace('Template List'));
                }
            },
        ]);

    }


    const checkTextEmpty = () => {

        if (!textInputAmount.toString().trim()) {
            alert("Please Enter Amount!");
            return false;
        }
        if (!textInputPaymentType.trim()) {
            alert("Please Enter PaymentType!");
            return false;
        }
        if (!textInputName.trim()) {
            alert("Please Enter Name!");
            return false;
        }
        if (!textInputNumber.trim()) {
            alert("Please Enter Account Number!");
            return false;
        }
        if (!textInputDescription.trim()) {
            alert("Please Enter Description!");
            return false;
        }
        return true;
    }


    const createNewTemplate = async () => {
        createTemplate(userId, textInputTitle, textInputAmount.toString(), textInputPaymentType, textInputName, textInputNumber, textInputDescription, getCurrencyCode(currency));
        Alert.alert("\"" + textInputTitle + "\" saved as a template.");

    }
    const handleUpdatePress = () => {
        updateTemplate(selectedTemplate.id, userId, textInputTitle, textInputAmount.toString(), textInputPaymentType, textInputName, textInputNumber, textInputDescription, getCurrencyCode(currency))
        Alert.alert(" Template \"" + textInputTitle + "\" updated.");

    }
    const [visible, setVisible] = useState(false);
    const [inputUsername, setUsernameForSend] = React.useState('');

    const sendTemplate = async (user) => {
        console.log("OVDJE MI ISPISI USERA",user)
        uid = await User.getRecipientDetails(user);
        console.log("OVDJE MI ID ISPISI",uid)
        if (uid) {

            createTemplate(uid.id, textInputTitle, textInputAmount?.toString(), textInputPaymentType, textInputName, textInputNumber, textInputDescription, getCurrencyCode(currency));
            Alert.alert("\"" + textInputTitle + "\" sent as a template to user " + user);

        }
        else
            Alert.alert("User \"" + user + "\" dosent exist");
    }

    function handleSendTemplate() {

        setVisible(true)
        
    }


    const handleSubmitUsername = async (username) => {
        setUsernameForSend(inputUsername),
        setVisible(false);
        sendTemplate(username)
    }

    const checkAndSubmitTransaction = async () => {
        if (checkTextEmpty()) {

            submitTransaction(textInputAmount, getCurrencyCode(currency), textInputPaymentType, textInputName, textInputNumber, textInputDescription);
        }

    }
    function getCurrencyName(tag) {
        switch (tag) {
            case 'KM':
                return 'Bosnian Mark';
            case '$':
                return 'US Dollar';
            case '\u20AC':
                return 'Euro';
        }
    }
    function getCurrencyCode(tag) {
        switch (tag) {
            case 'KM':
                return 'BAM';
            case '$':
                return 'USD';
            case '\u20AC':
                return 'EUR';
        }
    }

    function getCurrencyTag(code) {
        switch (code) {
            case 'BAM':
                return 'KM';
            case 'USD':
                return '$';
            case 'EUR':
                return '\u20AC';
        }
    }
    


    if (selectedTemplate?.id != null) {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.elipseContainer}>
                        <View style={styles.saveButtonAndTransactionContainer}>

                            <TextInput
                                style={styles.newTransactionTitle}
                                onChangeText={(value) => setTextInputTitle(value)}
                                defaultValue={textInputTitle}
                            ></TextInput>

                        

                        </View>

                        <View>
                            <View style={styles.amountCurrencyContainer}>
                                <CurrencyInput
                                    placeholder="Transaction amount"
                                    placeholderTextColor="#6e749d"
                                    style={styles.amountInput}
                                    value={textInputAmount}
                                    onChangeValue={(value) => {
                                        setTextInputAmount(value)
                                    }}
                                    prefix={currency === 'BAM' ? 'KM' : currency}
                                    delimiter=","
                                    separator="."
                                    precision={2}
                                    minValue={0}

                                />
                                <Picker
                                    selectedValue={currency}
                                    onValueChange={(currentCurrency) =>
                                        setCurrency(currentCurrency)
                                    }

                                    mode={'dropdown'}
                                    style={styles.currencyPicker}
                                >
                                    <Picker.Item label="BAM" value="KM" color="black" />
                                    <Picker.Item label="EUR" value={'\u20AC'} color="black" />
                                    <Picker.Item label="USD" value="$" color="black" />
                                </Picker>
                            </View>


                            <TextInput
                                style={styles.input}
                                placeholder="Payment type"
                                placeholderTextColor="#6e749d"
                                value={textInputPaymentType}
                                onChangeText={(value) => setTextInputPaymentType(value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Recipient name"
                                placeholderTextColor="#6e749d"
                                value={textInputName}
                                onChangeText={(value) => setTextInputName(value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Recipient account number"
                                placeholderTextColor="#6e749d"
                                value={textInputNumber}
                                onChangeText={(value) => setTextInputNumber(value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                placeholderTextColor="#6e749d"
                                value={textInputDescription}
                                onChangeText={(value) => setTextInputDescription(value)}
                            />
                            <Picker
                                selectedValue={category}
                                onValueChange={(currentCategory) =>
                                    setCategory(currentCategory)
                                }

                                style={styles.categoryPicker}
                            >
                                <Picker.Item label="Category" value={null} color="darkgrey" />
                                <Picker.Item label="Food and Drink" value="Food and Drink" color="black" />
                                <Picker.Item label="Entertainment" value="Entertainment" color="black" />
                                <Picker.Item label="Transportation" value="Transportation" color="black" />
                                <Picker.Item label="Shopping" value="Shopping" color="black" />
                                <Picker.Item label="Health and Wellness" value="Health and Wellness" color="black" />
                                <Picker.Item label="Travel" value="$" color="black" />
                                <Picker.Item label="Bills and Utilities" value="Bills and Utilities" color="black" />
                                <Picker.Item label="Other" value="Other" color="black" />

                            </Picker>

                            <Text style={styles.selectedCurrencyText}>
                                Selected: {getCurrencyName(currency)}
                            </Text>
                        </View>
                    </View>
                    <Pressable style={styles.submitButton} onPress={checkAndSubmitTransaction}>
                        <Text style={styles.text}>Submit</Text>
                    </Pressable>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Pressable style={styles.editButton} onPress={handleUpdatePress}>
                            <Text style={styles.text}>Update</Text>
                        </Pressable>
                        <Pressable style={styles.deleteButton} onPress={handleDeletePress}>
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
                            <TextInput
                                style={styles.newTransactionTitle}
                                onChangeText={(value) => setTextInputTitle(value)}
                                
                            >New Transaction</TextInput>

                            <Pressable style={styles.saveButton} onPress={createNewTemplate}>
                                <Text style={styles.saveButtonText}>SAVE</Text>
                            </Pressable>

                        </View>

                        <View>
                            <View style={styles.amountCurrencyContainer}>
                                <CurrencyInput
                                    placeholder="Transaction amount"
                                    placeholderTextColor="#6e749d"
                                    style={styles.amountInput}
                                    value={textInputAmount}
                                    onChangeValue={(value) => {
                                        setTextInputAmount(value)
                                    }}
                                    prefix={currency === 'BAM' ? 'KM' : currency}
                                    delimiter=","
                                    separator="."
                                    precision={2}
                                    minValue={0}

                                />
                                <Picker
                                    selectedValue={currency}
                                    onValueChange={(currentCurrency) =>
                                        setCurrency(currentCurrency)
                                    }

                                    mode={'dropdown'}
                                    style={styles.currencyPicker}
                                >
                                    <Picker.Item label="BAM" value="KM" color="black" />
                                    <Picker.Item label="EUR" value={'\u20AC'} color="black" />
                                    <Picker.Item label="USD" value="$" color="black" />
                                </Picker>
                            </View>


                            <TextInput
                                style={styles.input}
                                placeholder="Payment type"
                                placeholderTextColor="#6e749d"
                                onChangeText={(value) => setTextInputPaymentType(value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Recipient name"
                                placeholderTextColor="#6e749d"
                                onChangeText={(value) => setTextInputName(value)}
                            />
    
                            <TextInput
                                style={styles.input}
                                placeholder="Recipient account number"
                                placeholderTextColor="#6e749d"
                                onChangeText={(value) => setTextInputNumber(value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                placeholderTextColor="#6e749d"
                                onChangeText={(value) => setTextInputDescription(value)}
                            />

                            <Picker
                                selectedValue={category}
                                onValueChange={(currentCategory) =>
                                    setCategory(currentCategory)
                                }

                                style={styles.categoryPicker}
                            >
                                <Picker.Item label="Category" value={null} color="darkgrey" />
                                <Picker.Item label="Food and Drink" value="Food and Drink" color="black" />
                                <Picker.Item label="Entertainment" value="Entertainment" color="black" />
                                <Picker.Item label="Transportation" value="Transportation" color="black" />
                                <Picker.Item label="Shopping" value="Shopping" color="black" />
                                <Picker.Item label="Health and Wellness" value="Health and Wellness" color="black" />
                                <Picker.Item label="Travel" value="$" color="black" />
                                <Picker.Item label="Bills and Utilities" value="Bills and Utilities" color="black" />
                                <Picker.Item label="Other" value="Other" color="black" />
                                
                            </Picker>

                            <Text style={styles.selectedCurrencyText}>
                                Selected: {getCurrencyName(currency)}
                            </Text>
                        </View>
                    </View>
                    <Pressable style={styles.submitButton} onPress={checkAndSubmitTransaction}>
                        <Text style={styles.text}>Submit</Text>
                    </Pressable>
                    
                    <Pressable >
        <Text style={styles.sendText} onPress={handleSendTemplate}>
          Send to
        </Text>
      </Pressable>
      <View>
        <DialogInput 
                isDialogVisible={visible}
                title={"Send template"}
                message={"Send your template to another user"}
                hintInput ={"Enter Username"}
                submitInput={ (inputUsername) => handleSubmitUsername(inputUsername)}
                closeDialog={() => setVisible(false)}>
        </DialogInput>
       
            </View>

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
    categoryPicker: {
        width: "91%",
        marginTop: 5,
        marginLeft: 6,
        backgroundColor: "#6e749d"
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
        fontSize: 33,
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
    },
    sendText: {
        fontSize: 16,
        lineHeight: 15,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#6e749d',
        marginVertical: 1,
        textDecorationLine: 'underline',
        color: '#ffc022ef'
      }

});

export default TransactionScreen;
