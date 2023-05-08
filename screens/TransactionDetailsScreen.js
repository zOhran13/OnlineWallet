
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import {
    getTransactionById
} from "../modules/transactionModule";
import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';



export default function TransactionDetailsScreen({navigation}) {
    const [transaction, setTransaction] = useState({
        transactionId: "",
        createdAt: "",
        amount: "",
        currency: "",

        sender: {
            name: "",
            accountNumber: "",
            bankName: "",
            phoneNumber: "",
            type: "",
        },

        recipient: {
            name: "",
            accountNumber: "",
            bankName: "",         
            phoneNumber: "",
            type: "",
        },

        transactionType: "",
        transactionPurpose: "",
        category: "",
    });
    const { params } = useRoute();
    const id = params?.id;

    useEffect(() => {
        const fetchTransaction = async () => {
            data = await getTransactionById(id);
            setTransaction(data);
        };
        fetchTransaction();
    }, []);



    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Text style={styles.title}>Transaction Details</Text>
                <View style={styles.detailsContainer}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Amount:</Text>
                        <Text style={styles.value}>
                            {transaction.amount} {transaction.currency}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date and Time:</Text>
                        <Text style={styles.value}>{transaction.createdAt?.substring(0, 10)} {transaction.createdAt?.substring(11, 16) }</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Transaction Type:</Text>
                        <Text style={styles.value}>{transaction.transactionType}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Transaction Purpose:</Text>
                        <Text style={styles.value}>{transaction.transactionPurpose}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Category:</Text>
                        <Text style={styles.value}>{transaction.category}</Text>
                    </View>
                </View>
            </View>

            <View>
                <Text style={styles.title}>Sender</Text>
                <View style={styles.detailsContainer}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>
                            {transaction.sender.name}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Bank name:</Text>
                        <Text style={styles.value}>{transaction.sender.bankName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Account number:</Text>
                        <Text style={styles.value}>{transaction.sender.accountNumber}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Phone number:</Text>
                        <Text style={styles.value}>{transaction.sender.phoneNumber}</Text>
                    </View>
                </View>
            </View>

            <View>
                <Text style={styles.title}>Receiver</Text>
                <View style={styles.detailsContainer}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>
                            {transaction.recipient.name}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Bank name:</Text>
                        <Text style={styles.value}>{transaction.recipient.bankName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Account number:</Text>
                        <Text style={styles.value}>{transaction.recipient.accountNumber}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Phone number:</Text>
                        <Text style={styles.value}>{transaction.recipient.phoneNumber}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.container2}>
<Pressable
            contentContainerStyle={styles.container2}
          style={styles.claimButton}
          onPress={() => navigation.navigate("Claim", {transaction: transaction})}
        >
          <Text style={styles.text2}>RAISE A CLAIM</Text>
        </Pressable>

            </View>
             

           
           
        </ScrollView>


       

    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#1B1938",
        
        padding: 20,
        justifyContent: "center",
        
    },
    container2: {
        flexGrow: 1,
        backgroundColor: "#1B1938",
        justifyContent: "center",
        alignItems: "center",
    },

    claimButton: {
        marginTop: 40,
        backgroundColor: "#FFC022",
        width: 170,
        height: 35,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
      },

      
      text2: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "black",
      },
      
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
        marginTop: 20,
        marginBottom: 10,
    },
    detailsContainer: {
        backgroundColor: "#312e66",
        borderColor: "#645CD1",
        borderRadius: 10,
        padding: 20,
        marginTop: 0,
        borderWidth: 2,
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    label: {
        flex: 1,
        color: "white",
    },
    value: {
        color: "white",
        textAlign: 'right',
    },
});
