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

import CurrencyInput from 'react-native-currency-input';

const TransactionScreen = ({ navigation }) => {
    

    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [currency, setCurrency] = useState("KM");
    const [textInputTitle, setTextInputTitle] = useState("New Transaction");
    const [textInputPaymentType, setTextInputPaymentType] = useState("")
    const [textInputName, setTextInputName] = useState("");
    const [textInputDescription, setTextInputDescription] = useState("");
    const [textInputNumber, setTextInputNumber] = useState("");
    const [textInputAmount, setTextInputAmount] = useState("");

    const { params } = useRoute();
    const id = params?.id;
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
                console.log(selectedTemplate);
                setTextInputTitle(selectedTemplate.title);
                setTextInputAmount(selectedTemplate.amount);
                setTextInputPaymentType(selectedTemplate.paymentType);
                setTextInputName(selectedTemplate.recipientName);
                setTextInputNumber(selectedTemplate.recipientAccountNumber);
                setTextInputDescription(selectedTemplate.description);
                setCurrency(selectedTemplate.currency);
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


    const createNewTemplate = () => {
        createTemplate("1", textInputTitle, textInputAmount.toString(), textInputPaymentType, textInputName, textInputNumber, textInputDescription, currency);
        Alert.alert("\"" + textInputTitle + "\" saved as a template.");

    }
    const handleUpdatePress = () => {
        updateTemplate(selectedTemplate.id, "1", textInputTitle, textInputAmount, textInputPaymentType, textInputName, textInputNumber, textInputDescription, currency)
        Alert.alert(" Template \"" + textInputTitle + "\" updated.");

    }
    const checkAndSubmitTransaction = () => {
        if (checkTextEmpty()) {

            submitTransaction(textInputAmount, currency, textInputPaymentType, textInputName, textInputNumber, textInputDescription);
        }

    }
    function getCurrencyName(code) {
        switch (code) {
            case 'KM':
                return 'Bosnian Mark';
            case '$':
                return 'US Dollar';
            case '\u20AC':
                return 'Euro';
        }
    }
    


    if (selectedTemplate?.id != null) {
        console.log(selectedTemplate);
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
                                Selected: {getCurrencyName(currency)}
                            </Text>
                        </View>
                    </View>
                    <Pressable style={styles.submitButton} onPress={checkAndSubmitTransaction}>
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
    }

});

export default TransactionScreen;
