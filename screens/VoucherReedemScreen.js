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
import { getAccounts } from "../modules/transactionModule";

import { Picker } from "@react-native-picker/picker";
const VoucherReedemScreen = ({ navigation }) => {
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState("");


    useEffect(() => {
        const fetchAccounts = async () => {
            accs = await getAccounts()
            setAccounts(accs);
            console.log(accs)
        };
        fetchAccounts();
    }, []);

    const [voucher, setVoucher] = useState("");
    const sendVoucher = async () => {
        var pattern = /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;

        if (!pattern.test(voucher) ) {
            ToastAndroid.show("Invalid voucher format", ToastAndroid.SHORT);
        }
        else if (account === "null") {
            ToastAndroid.show("Please choose account", ToastAndroid.SHORT);
        }
        else {
            User.redeemVoucher(voucher,account);
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
                <Picker
                    selectedValue={account}
                    onValueChange={(acc) =>
                        setAccount(acc)
                    }

                    mode={'dropdown'}
                    style={styles.picker}
                >

                    <Picker.Item label="Choose account" value="null" ></Picker.Item>
                    {accounts.map((item) => (
                        <Picker.Item label={item.accountNumber + " " + item.currency + " " + item.bankName} value={item.accountNumber} color="black"/>
                    ))}
                </Picker>
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
    picker: {
        backgroundColor: "#6e749d",
        height: "8%",
        marginTop: 10,
        marginBottom: 5,
        
        width: "90%",
    },
    box: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "95%",
        height: "65%",
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
