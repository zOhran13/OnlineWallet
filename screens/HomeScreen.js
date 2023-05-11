import React, { useState, useEffect, useRef } from "react";
import { Text, ScrollView, View, Image, StyleSheet, Pressable, DrawerLayoutAndroid, FlatList } from "react-native";
import * as User from '../modules/userModule';
import { submitTransaction, submitPhoneTransaction, getTransactions, getAccounts } from "../modules/transactionModule";
import { NavigationActions } from 'react-navigation';
import { useIsFocused, StackActions,  } from '@react-navigation/native';




const HomeScreen = ({ navigation }) => {
    const [accounts, setAccounts] = useState("");
    const [user, setUser] = useState({});

    const isFocused = useIsFocused();
    const fetchUser = async () => {
        xid = await User.getUserDetails();
        setUser(xid);
        accs = await getAccounts()
        setAccounts(accs);

    };
    useEffect(() => {
        if (isFocused) {
            fetchUser();
            console.log('Home screen is focused');
        }
    }, [isFocused]);
    useEffect(() => {

        fetchUser();

    }, []);

    

    const navigationView = (

        <View >

            <ScrollView >
                <View style={styles.menuProfile}>

                    <View style={styles.circle} View>

                        <Text style={{ fontSize: 60, color: "white", paddingTop: 10 }}>{user.firstName?.substring(0, 1)}</Text>

                    </View>
                    <Text style={styles.text3}>{user.firstName + " " + user.lastName}</Text>
                    <Text style={styles.text4}>{user.email}</Text>
                    <Text style={styles.text4}>{user.phoneNumber}</Text>

                </View>
                <Pressable
                    style={styles.listTemplatesButton}
                    onPress={() => navigation.navigate("Template List")}
                >
                    <Image
                        source={require("../assets/images/listTemplates.png")}
                        style={styles.buttonImage}
                    />
                    <Text style={styles.text}>Template list</Text>
                </Pressable>
                <Pressable
                    style={styles.listTemplatesButton}
                    onPress={() => navigation.navigate("Voucher Reedem")}
                >
                    <Image
                        source={require("../assets/images/voucher.png")}
                        style={styles.buttonImage}
                    />
                    <Text style={styles.text}>Voucher Redeem</Text>
                </Pressable>
                <Pressable
                    style={styles.listTemplatesButton}
                    onPress={() => navigation.navigate("NewAccountCreation")}
                >
                    <Image
                        source={require("../assets/images/newbank.png")}
                        style={styles.buttonImage}
                    />
                    <Text style={styles.text}>Create New Account</Text>
                </Pressable>
                <Pressable
                    style={styles.listTemplatesButton}
                    onPress={() => navigation.navigate("RequestedAccounts")}
                >
                    <Image
                        source={require("../assets/images/menu.png")}
                        style={styles.buttonImage}
                    />
                    <Text style={styles.text}>Requested Accounts</Text>
                </Pressable>
                <Pressable
                    style={styles.listTemplatesButton}
                    onPress={() => navigation.navigate("MyTransactions")}
                >
                    <Image
                        source={require("../assets/images/menu.png")}
                        style={styles.buttonImage}
                    />
                    <Text style={styles.text}>My Transactions</Text>
                </Pressable>



                
                <Pressable
                    style={styles.listTemplatesButton}
                    onPress={() => {
                        User.logout();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    }}
                >
                    <Image
                        source={require("../assets/images/logout.png")}
                        style={styles.buttonImage}
                    />
                    <Text style={styles.text}>Logout</Text>
                </Pressable>
            </ScrollView>

        </View>
    );

    return (
        <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition={'left'}
            renderNavigationView={() => navigationView}>
            
            <View style={styles.container}>
                <View style={styles.container2}>
                    <FlatList
                        data={accounts}
                        renderItem={({ item: account }) => {
                            return (
                                <View style={styles.transactionContainer} key={account.id}>
                                    <View style={styles.containerAccount}>
                                        <View>
                                            <Text style={styles.accountDetails}>{account.accountNumber + " " + account.currency}</Text>
                                            <Text style={styles.accountDetails}>{account.bankName}</Text>
                                            <Text style={styles.accountDetails}>{account.description}</Text>

                                        </View>
                                        <View style={styles.containerAccount}>
                                            <Text style={{ fontSize: 20 }}>{account.total.toFixed(2) + " " + account.currency}</Text>
                                            <Image
                                                style={styles.image}
                                                source={require("../assets/images/WalletPicture.png")}
                                            />
                                        </View>


                                    </View>



                                </View>
                            );
                        }}
                    />
                </View>
                <View style={styles.container1}>
                    <Pressable
                        style={styles.payButton}
                        onPress={() => navigation.navigate("Transaction")}
                    >
                        <Text style={styles.text}>PAY</Text>
                    </Pressable>
                </View>


            </View>
        </DrawerLayoutAndroid>
    );
};
const styles = StyleSheet.create({
    accountDetails: {
        fontSize: 15,
        paddingLeft: 5,
    },
    containerAccount: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 4,
        justifyContent: "space-between"
    },
    transactionContainer: {
        borderColor: "black",
        borderRadius: 5,
        backgroundColor: "#FFC021",
        width: 300,
        height: 70,
        marginVertical: 10,
    },
    imageContainer: {
        marginRight: 10,
    },
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    image: {
        width: 40,
        height: 40,
    },
    circle: {
        backgroundColor: '#1B1938',
        height: 100,
        paddingBottom: 20,
        width: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        alignItems: "center",
        backgroundColor: "#1B1938",
        flex: 1,
        justifyContent: "center",
        paddingTop: 0,
    },
    container1: {
        alignItems: "center",
        borderColor: "black",
        borderRadius: 40,
        justifyContent: "center",
        paddingTop: 50,
        width: "80%",
    },
    container2: {
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: "#312e66",
        width: "95%",
        height: "60%",

    },
    listTemplatesButton: {
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
    },
    menuProfile: {
        alignItems: "center",
        backgroundColor: "#312e66",
        height: 190,
        paddingTop: 10
    },
    myTransactionsButton: {
        alignItems: "center",
        backgroundColor: "#FFC021",
        borderRadius: 30,
        justifyContent: "center",
        marginTop: 15,
        padding: 15,
        width: 250,
    },
    payButton: {
        alignItems: "center",
        backgroundColor: "#FFC021",
        borderRadius: 30,
        justifyContent: "center",
        padding: 20,
        width: 150,
    },
    requestButton: {
        alignItems: "center",
        backgroundColor: "#FFC021",
        borderRadius: 30,
        justifyContent: "center",
        marginTop: 70,
        padding: 15,
        width: 250,
    },
    buttonImage: {
        height: 40,
        width: 40,
    },
    text: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 0.25,
        paddingLeft: 10,
        lineHeight: 21,
    },
    text2: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.25,
        lineHeight: 21,
    },
    text3: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        justifyContent: "center",
        letterSpacing: 0.25,
        paddingTop: 10,
        lineHeight: 21,
    },
    text4: {
        color: "white",
        fontSize: 13,
        justifyContent: "center",
        letterSpacing: 0.25,
        lineHeight: 21,
    },
});


export default HomeScreen;
