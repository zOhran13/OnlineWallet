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
import CurrencyInput from 'react-native-currency-input';
import DialogInput from 'react-native-dialog-input';
import {t } from '..'


const TransactionScreen = ({ navigation }) => {


    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [currency, setCurrency] = useState("KM");
    const [textInputTitle, setTextInputTitle] = useState("New Transaction");
    const [paymentType, setPaymentType] = useState("C2B")
    const [textInputName, setTextInputName] = useState("");
    const [textInputDescription, setTextInputDescription] = useState("");
    const [textInputNumber, setTextInputNumber] = useState("");
    const [textInputAmount, setTextInputAmount] = useState("");
    const [category, setCategory] = useState("");
    const [userId, setUserId] = useState("");
    const [textInputPhoneNumber, setTextInputPhoneNumber] = useState("");
    const { params } = useRoute();
    const [c2c, setC2c] = useState(false)
    const id = params?.id;
    const [userCategory, setUserCategory] = useState(false);
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const fetchUserId = async () => {
            xid = await User.getUserDetails()
            setUserId(xid.id);

        };
        fetchUserId();
    }, []);


    useEffect(() => {
        const getTransactionList = async () => {
            const data = await getTransactions();
            console.log("Sada");
            const newTransactions = data.map(item => ({
                paymentType: item.transactionType,
                recipientName: item.recipient.name,
                recipientAccountNumber: item.recipient.accountNumber,
                recipientPhone: item.recipient.phoneNumber,
                description: item.transactionPurpose,
                category: item.category
            }));
            setTransactions(newTransactions);
        };
        getTransactionList();
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
                setPaymentType(selectedTemplate.paymentType);
                setCurrency(getCurrencyTag(selectedTemplate.currency));
                setTextInputName(selectedTemplate.recipientName);
                setTextInputNumber(selectedTemplate.recipientAccountNumber);
                setTextInputDescription(selectedTemplate.description);
                setTextInputPhoneNumber(selectedTemplate.phoneNumber);
                setCategory(selectedTemplate.category);
                if (selectedTemplate.paymentType == "C2C")
                    setC2c(true);
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

        if (paymentType != "C2C") {
            if (!textInputName.trim()) {
                alert("Please Enter Name!");
                return false;
            }
            if (!textInputNumber.trim()) {
                alert("Please Enter Account Number!");
                return false;
            }
        }
        if (paymentType == "C2C" && !textInputPhoneNumber.toString().trim()) {
            alert("Please enter Phone Number");
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


    const createNewTemplate = async () => {
        if (paymentType == "C2C")
            createTemplate(userId, textInputTitle, textInputAmount?.toString(), paymentType, "", "", textInputDescription, textInputPhoneNumber, getCurrencyCode(currency), category);
        else
            createTemplate(userId, textInputTitle, textInputAmount?.toString(), paymentType, textInputName, textInputNumber, textInputDescription, "", getCurrencyCode(currency), category);
        Alert.alert("\"" + textInputTitle + "\" saved as a template.");

    }
    const handleUpdatePress = async () => {
        console.log(textInputTitle)
        if (paymentType == "C2C")
            updateTemplate(selectedTemplate.id, userId, textInputTitle, textInputAmount?.toString(), paymentType, "", "", textInputDescription, textInputPhoneNumber, getCurrencyCode(currency), category);
        else
            updateTemplate(selectedTemplate.id, userId, textInputTitle, textInputAmount?.toString(), paymentType, textInputName, textInputNumber, textInputDescription, "", getCurrencyCode(currency), category);
        Alert.alert(" Template \"" + textInputTitle + "\" updated.");

    }
    const [visible, setVisible] = useState(false);
    const [inputUsername, setUsernameForSend] = React.useState('');

    const sendTemplate = async (user) => {
        uid = await User.getRecipientDetails(user);
        console.log(uid.id);

        if (uid) {

            if (paymentType == "C2C")
                createTemplate(uid.id, textInputTitle, textInputAmount?.toString(), paymentType, "", "", textInputDescription, textInputPhoneNumber, getCurrencyCode(currency), category, "true");
            else
                createTemplate(uid.id, textInputTitle, textInputAmount?.toString(), paymentType, textInputName, textInputNumber, textInputDescription, "", getCurrencyCode(currency), category, "true");
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
        if (checkTextEmpty(paymentType)) {
            if (paymentType != "C2C")
                submitTransaction(textInputAmount, paymentType, textInputName, textInputNumber, textInputDescription, textInputPhoneNumber, getCurrencyCode(currency), category);
            else
                submitPhoneTransaction(textInputAmount, paymentType, textInputName, textInputNumber, textInputDescription, textInputPhoneNumber, getCurrencyCode(currency), category);
            setUserCategory(false);

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

    

    function autoCategory() {
        const highestCategory = filterAndSumCategories();
        setCategory(highestCategory);
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
                    {id && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, paddingTop: -10 }} >
                            <Pressable
                                style={styles.listTemplatesButton}
                                onPress={() => handleSendTemplate()}
                            >
                                <Image
                                    source={require("../assets/images/sendIcon.png")}
                                    style={styles.buttonImage}
                                />
                            </Pressable>
                            <Pressable
                                style={styles.listTemplatesButton}
                                onPress={() => handleUpdatePress()}
                            >
                                <Image
                                    source={require("../assets/images/saveIcon.png")}
                                    style={styles.buttonImage}
                                />
                            </Pressable>
                            <Pressable
                                style={styles.listTemplatesButton}
                                onPress={() => handleDeletePress()}
                            >
                                <Image
                                    source={require("../assets/images/deleteIcon.png")}
                                    style={styles.buttonImage}
                                />
                            </Pressable>
                        </View>)}

                    <View style={styles.elipseContainer}>
                        <View style={styles.saveButtonAndTransactionContainer}>
                            <TextInput
                                style={styles.newTransactionTitle}
                                onChangeText={(value) => {
                                    setTextInputTitle(value)
                                }
                                }

                            >{textInputTitle}</TextInput>
                            {!id && (

                                <Pressable style={styles.saveButton} onPress={createNewTemplate}>
                                    <Text style={styles.saveButtonText}>SAVE</Text>
                                </Pressable>
                            )}

                        </View>

                        <View>

                            <View style={styles.amountCurrencyContainer}>
                                <Text style={{ color: "white" }}>Payment Type:</Text>

                                <Picker
                                    selectedValue={paymentType}
                                    value={paymentType}
                                    onValueChange={(type) => {
                                        setPaymentType(type)
                                        if (type == "C2C")
                                            setC2c(true);
                                        else
                                            setC2c(false);
                                    }

                                    }

                                    mode={'dropdown'}
                                    style={styles.paymentPicker}
                                >
                                    <Picker.Item label="C2B" value="C2B" color="black" />
                                    <Picker.Item label="C2C" value="C2C" color="black" />
                                    <Picker.Item label="B2C" value="B2C" color="black" />
                                </Picker>
                            </View>


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

                            {c2c && (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Recipient phone number"
                                    value={textInputPhoneNumber}
                                    placeholderTextColor="#6e749d"
                                    keyboardType='number-pad'
                                    onChangeText={(value) => {
                                        if (!userCategory)
                                            autoCategory();
                                        setTextInputPhoneNumber(value)
                                    }
                                    }
                                />)}

                            {!c2c && (<>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Recipient name"
                                    placeholderTextColor="#6e749d"
                                    value={textInputName}
                                    onChangeText={(value) => {
                                        if (!userCategory)
                                            autoCategory();
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
                                        if (!userCategory)
                                            autoCategory();
                                        setTextInputNumber(value)
                                    }}
                                />

                            </>)}
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={textInputDescription}
                                placeholderTextColor="#6e749d"
                                onChangeText={(value) => {
                                    if (!userCategory)
                                        autoCategory();
                                    setTextInputDescription(value)
                                }
                                }
                            />



                            <Picker
                                selectedValue={category}
                                onValueChange={(category) => {
                                    setUserCategory(true);
                                    setCategory(category);
                                }
                                }

                                style={styles.categoryPicker}
                            >
                                <Picker.Item label="Category" value={null} color="darkgrey" />
                                <Picker.Item label="Food and Drink" value="Food and Drink" color="black" />
                                <Picker.Item label="Entertainment" value="Entertainment" color="black" />
                                <Picker.Item label="Transportation" value="Transportation" color="black" />
                                <Picker.Item label="Shopping" value="Shopping" color="black" />
                                <Picker.Item label="Health and Wellness" value="Health and Wellness" color="black" />
                                <Picker.Item label="Travel" value="Travel" color="black" />
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
                    {!id && (
                        <Pressable >
                            <Text style={styles.sendText} onPress={handleSendTemplate}>
                                Send to
                            </Text>
                        </Pressable>
                    )}

                    <View>
                        <DialogInput
                            isDialogVisible={visible}
                            title={"Send template"}
                            message={"Send your template to another user"}
                            hintInput={"Enter Username"}
                            submitInput={(inputUsername) => handleSubmitUsername(inputUsername)}
                            closeDialog={() => setVisible(false)}>
                        </DialogInput>

                    </View>

                </View>
            </ScrollView>
        </>
    );

};

const styles = StyleSheet.create({
    amountCurrencyContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 0,
    },
    amountInput: {
        alignItems: "stretch",
        backgroundColor: "#23204d",
        borderRadius: 10,
        color: "white",
        height: 50,
        margin: 4,
        padding: 9,
        width: "50%",
    },
    buttonImage: {
        height: 50,
        width: 50,
    },
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
        paddingBottom: '30%'
    },
    currencyPicker: {
        backgroundColor: "#6e749d",
        height: "10%",
        marginLeft: 2,
        marginBottom: 5,
        marginRight: 23,
        width: "40%",
    },
    deleteButton: {
        alignItems: "center",
        backgroundColor: "#FFC021",
        borderRadius: 30,
        justifyContent: "center",
        margin: 10,
        padding: "5%",
        width: "30%",
    },
    editButton: {
        alignItems: "center",
        backgroundColor: "#FFC021",
        borderRadius: 30,
        justifyContent: "center",
        margin: 10,
        padding: "1%",
        width: "30%",
    },
    elipseContainer: {
        backgroundColor: "#312e66",
        borderColor: "black",
        borderRadius: 50,
        margin: 3,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingVertical: 'auto',
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
    listTemplatesButton: {
        marginLeft: "5%",
    },
    newTransactionTitle: {
        color: "#b7bace",
        fontSize: 33,
        fontWeight: "bold",
        marginLeft: 4,
        marginBottom: 10,
        padding: 5,
        width: "86%",
    },
    paymentPicker: {
        backgroundColor: "#6e749d",
        height: "10%",
        marginLeft: 35,
        marginBottom: 5,
        marginRight: 2,
        width: "40%",
    },
    saveButton: {

    },
    saveButtonAndTransactionContainer: {
        flexDirection: 'row'
    },
    saveButtonText: {
        color: "#FFC021",
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectedCurrencyText: {
        color: "#6e749d",
        margin: 8,

    },
    scroll: {
        flexGrow: 2,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: 'white',

    },
    sendText: {
        color: '#ffc022ef',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        lineHeight: 15,
        marginVertical: 1,
        textDecorationLine: 'underline',
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

export default TransactionScreen;
