import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Alert,
    Pressable,
    Image,
    ScrollView,
    Keyboard
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { submitTransaction, submitPhoneTransaction, getTransactions } from "../modules/transactionModule";
import { useRoute } from '@react-navigation/native';
import { getTemplate, deleteTemplate, updateTemplate, createTemplate } from "../modules/templatesModule";
import { useNavigation, StackActions } from '@react-navigation/native';
import * as User from '../modules/userModule';

const EInvoiceRegistrationScreen = ({ navigation }) => {

    const [textInputName, setTextInputName] = useState("");
    const [textInputDescription, setTextInputDescription] = useState("");
    const [textInputNumber, setTextInputNumber] = useState("");
    const [category, setCategory] = useState("");
    const [userId, setUserId] = useState("");
    const [textInputPhoneNumber, setTextInputPhoneNumber] = useState("");
    const { params } = useRoute();
    const id = params?.id;
    const [userCategory, setUserCategory] = useState(false);
    const [transactions, setTransactions] = useState([])
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        const fetchUserId = async () => {
            xid = await User.getUserDetails()
            setUserId(xid.id);

        };
        fetchUserId();
    }, []);


    useEffect(() => {
        const getTransactionList = async () => {
            const data = await getTransactions("1", "20");
            if (Array.isArray(data)) {

                const newTransactions = data.map(item => ({
                    paymentType: item.transactionType,
                    recipientName: item.recipient.name,
                    recipientAccountNumber: item.recipient.accountNumber,
                    recipientPhone: item.recipient.phoneNumber,
                    description: item.transactionPurpose,
                    category: item.category
                }));
                setTransactions(newTransactions);
            }
        };
        getTransactionList();
    }, []);


    const checkTextEmpty = () => {

        if (!textInputAmount.toString().trim()) {
            alert("Please Enter Amount!");
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

        if (!category) {
            alert("Please choose Category")
            return false;
        }


        return true;
    }



    const handleSubmitUsername = async (username) => {
        setUsernameForSend(inputUsername),
            setVisible(false);
        sendTemplate(username)
    }

    const checkAndSubmitTransaction = async () => {
        if (checkTextEmpty(paymentType)) {

            submitTransaction(textInputAmount, paymentType, textInputName, textInputNumber, textInputDescription, textInputPhoneNumber, getCurrencyCode(currency), category);

            setUserCategory(false);

        }

    }




    function filterAndSumCategories() {
        const accountNumber = textInputNumber;
        const phoneNumber = textInputPhoneNumber;
        const recipientName = textInputName;
        const descriptionWords = textInputDescription?.split(' ');
        const englishExcludedWords = [
            'and', 'but', 'or', 'yet', 'for', 'nor', 'so', 'at', 'by',
            'from', 'in', 'of', 'on', 'to', 'for', 'payment', 'transfer', 'from', 'with'
        ];


        const accountNumberList = transactions.filter((transaction) => {
            const number = transaction.recipientAccountNumber ? transaction.recipientAccountNumber.toLowerCase() : '';
            return number === accountNumber;
        });

        const phoneNumberList = transactions.filter((transaction) => {

            const phone = transaction.recipientPhone ? transaction.recipientPhone.toLowerCase() : '';

            return phone === phoneNumber;
        });

        const recipientNameList = transactions.filter((transaction) => {
            const name = transaction.recipientName ? transaction.recipientName.toLowerCase() : '';
            return name === recipientName

        });
        const descriptionList = transactions.filter((transaction) => {

            const description = transaction.description ? transaction.description.toLowerCase() : '';
            return descriptionWords?.some((word) => {
                if (!englishExcludedWords.includes(word.toLowerCase()))
                    return description.includes(word.toLowerCase());
            });
        });


        //daje se prednost opisu
        const allLists = [accountNumberList, phoneNumberList, recipientNameList, descriptionList, descriptionList, descriptionList, descriptionList, descriptionList];
        const categoryCounts = {};

        allLists.forEach((list) => {
            list.forEach((transaction) => {
                const category = transaction.category;
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            });
        });

        const highestCategory = Object.keys(categoryCounts).reduce((a, b) => {
            return categoryCounts[a] > categoryCounts[b] ? a : b;
        }, []);


        return highestCategory;
    }




    return (
        <>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={true}>
                <View style={styles.container}>

                    <View style={styles.elipseContainer}>
                       
                        

                        <Picker
                                selectedValue={category}
                                onValueChange={(category) => {
                                    setUserCategory(true);
                                    setCategory(category);
                                }
                                }

                                style={styles.categoryPicker}
                            >
                                <Picker.Item label="Company" value={null} color="darkgrey" />
                                <Picker.Item label="Food and Drink" value="Food and Drink" color="black" />
                                <Picker.Item label="Entertainment" value="Entertainment" color="black" />
                                <Picker.Item label="Transportation" value="Transportation" color="black" />
                                <Picker.Item label="Shopping" value="Shopping" color="black" />
                                <Picker.Item label="Health and Wellness" value="Health and Wellness" color="black" />
                                <Picker.Item label="Travel" value="Travel" color="black" />
                                <Picker.Item label="Bills and Utilities" value="Bills and Utilities" color="black" />
                                <Picker.Item label="Other" value="Other" color="black" />

                            </Picker>

                            <View style={styles.inputFieldsContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Recipient name"
                                placeholderTextColor="#6e749d"
                                value={textInputName}
                                onChangeText={(value) => {
                                    setTextInputName(value);
                                }
                                }
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Recipient account number"
                                value={textInputNumber}
                                placeholderTextColor="#6e749d"
                                onChangeText={(value) => {
                                    setTextInputNumber(value)
                                }}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={textInputDescription}
                                placeholderTextColor="#6e749d"
                                onChangeText={(value) => {
                                    setTextInputDescription(value)
                                }
                                }
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={textInputDescription}
                                placeholderTextColor="#6e749d"
                                onChangeText={(value) => {
                                    setTextInputDescription(value)
                                }
                                }
                            />

                        </View>
                    </View>
                    <Pressable style={styles.submitButton} onPress={checkAndSubmitTransaction}>
                        <Text style={styles.text}>Submit</Text>
                    </Pressable>
                
                    

                </View>
            </ScrollView>
        </>
    );

};

const styles = StyleSheet.create({
    categoryPicker: {
        backgroundColor: "#6e749d",
        marginLeft: 6,
        marginTop: 5,
        width: "91%",
    },
    container: {
        alignItems: "center",
        backgroundColor: "#1B1938",
        paddingTop: '5%',
        paddingBottom: '100%'
    },
    elipseContainer: {
        backgroundColor: "#312e66",
        borderColor: "black",
        borderRadius: 50,
        margin: 3,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingVertical: 'auto',
        height: '90%',
        width: '90%'
    },
    inputFieldsContainer: {
        paddingTop: '10%',
    },
    input: {
        alignItems: "stretch",
        backgroundColor: "#23204d",
        borderRadius: 10,
        color: "white",
        height: 50,
        margin: 4,
        padding: 9,
        width: "92%",
    },
    scroll: {
        flexGrow: 2,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: 'white',

    },
   
    submitButton: {
        alignItems: "center",
        backgroundColor: "#FFC021",
        borderRadius: 30,
        justifyContent: "center",
        margin: 10,
        padding: "5%",
        width: "50%",
    },
    text: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 0.25,
        lineHeight: 21,
    }
}
);

export default EInvoiceRegistrationScreen;
