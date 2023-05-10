import TransactionDetailsScreen from "./screens/TransactionDetailsScreen";
import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View, DrawerLayoutAndroid } from 'react-native';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import PhoneVerificationScreen from './screens/PhoneVerificationScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import TransactionScreen from './screens/TransactionScreen';
import MyTransactionsScreen from './screens/MyTransactionsScreen';
import NewAccountCreationScreen from './screens/NewAccountCreationScreen';
import ClaimScreen from "./screens/ClaimScreen";
import EmailOrPhoneVerificationScreen from "./screens/EmailOrPhoneVerificationScreen";
import TemplateListScreen from "./screens/TemplateListScreen";
import RequestedAccounts from "./screens/RequestedAccounts";
import VoucherReedemScreen from "./screens/VoucherReedemScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import registerNNPushToken from "native-notify";
import Icon from "react-native-vector-icons/FontAwesome";

import RegistrationScreen from './screens/RegistrationScreen';

import React, { useRef } from "react";

const Stack = createNativeStackNavigator();
export default function App() {
  
    registerNNPushToken(7256, "49XqdeSbyrq5jqZH1ZctRG");
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <TouchableOpacity >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        opacity: 0.7,
                                    }}
                                >
                                    <Icon
                                        name="bars"
                                        size={25}
                                    />
                                    <Text style={{ fontSize: 20, paddingLeft: 8 }}> </Text>
                                </View>
                            </TouchableOpacity>
                        ),
                    })}
                />

                <Stack.Screen name="NewAccountCreation" component={NewAccountCreationScreen} />
                <Stack.Screen name="RequestedAccounts" component={RequestedAccounts} />
                <Stack.Screen name="Claim" component={ClaimScreen} />

                <Stack.Screen name="MyTransactions" component={MyTransactionsScreen} />
                <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
                <Stack.Screen
                    name="Template List"
                    component={TemplateListScreen}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        opacity: 0.7,
                                    }}
                                >
                                    <Icon
                                        name="arrow-left"
                                        size={16}
                                        style={{ fontWeight: "100" }}
                                    />
                                    <Text style={{ fontSize: 16 }}> </Text>
                                </View>
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen name="EmailVerification" component={EmailVerificationScreen}/>
                <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen}/>
                <Stack.Screen name="EmailOrPhoneVerification" component={EmailOrPhoneVerificationScreen}/>
                <Stack.Screen name="Transaction" component={TransactionScreen} />

                <Stack.Screen name="Voucher Reedem" component={VoucherReedemScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1938',
        alignItems: 'center',
        justifyContent: 'center',

    },
});
