import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    Pressable,
    ScrollView,
} from "react-native";
import { BackHandler } from "react-native";
import * as User from '../modules/userModule';
import { submitTransaction, submitPhoneTransaction, getTransactions } from "../modules/transactionModule";
const MyTransactionsScreen = ({ navigation }) => {
    const [transactions, setTransactions] = useState([]);
    const [pageNumber, setPageNumber] = useState("2");
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchUserTransactions = async () => {
            xid = await User.getUserDetails();
            setUserId(xid.id);
            setUserName(xid.firstName + " " + xid.lastName);
            const trans = await getTransactions("1", "10");
            setTransactions(trans);
        };
        fetchUserTransactions();
        const backAction = () => {
            navigation.navigate("Home");
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);


    const moreTransactions = async () => {
        setPageNumber((parseInt(pageNumber) + 1).toString())
        console.log(pageNumber)
        const newTransactions = await getTransactions(pageNumber, "10");
        console.log(newTransactions)
        if (Array.isArray(newTransactions))
            setTransactions([...transactions, ...newTransactions]);
        else
            setPageNumber((parseInt(pageNumber) - 1).toString())
    }
    const isCloseToBottom = async({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const handlePress = (id) => {
        navigation.navigate("TransactionDetails", { id });
    };

    return (

        <ScrollView style={{ backgroundColor: "#1B1938" }} 
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    moreTransactions();
                }
            }}
            scrollEventThrottle={400}

        >

            <View style={styles.container}>
                {transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((transaction) => (
                    <View style={styles.transactionContainer} key={transaction.transactionId}>
                        <Pressable
                            style={styles.transactionContainer}
                            onPress={() => handlePress(transaction.transactionId)}
                        >
                            <View style={styles.imageContainer}>
                                {userName === transaction.sender.name && (
                                    <Image
                                        style={styles.image}
                                        source={require("../assets/images/red_arrow.png")}
                                    />
                                )}
                                {userName !== transaction.sender.name && (
                                    <Image
                                        style={styles.image}
                                        source={require("../assets/images/green_arrow.png")}
                                    />
                                )}
                            </View>
                            <View style={styles.detailsContainer}>
                                {userName === transaction.sender.name && (
                                    <Text style={styles.text}>{transaction.recipient.name}</Text>
                                )}
                                {userName !== transaction.sender.name && (
                                    <Text style={styles.text}>{transaction.sender.name}</Text>
                                )}
                                <Text>{transaction.createdAt.substring(0, 10)} {transaction.createdAt.substring(11, 16)}</Text>
                                <Text>
                                    {transaction.amount} {transaction.currency}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                ))}
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#1B1938",
        alignItems: "center",
        padding: 10,
    },
    transactionContainer: {
        borderColor: "black",
        borderRadius: 10,
        backgroundColor: "#FFC021",
        padding: 10,
        width: "90%",
        marginBottom: 10,
        flexDirection: "row",
    },
    imageContainer: {
        marginRight: 10,
    },
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "black",
    },
    image: {
        width: 50,
        height: 50,
    },
});

export default MyTransactionsScreen;
