import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AccountBalance from './components/AccountBalance';
import RegistrationScreen from './screens/RegistrationScreen';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import PhoneVerificationScreen from './screens/PhoneVerificationScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import TransactionScreen from './screens/TransactionScreen';
import MyTransactionsScreen from './screens/MyTransactionsScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TemplateListScreen from "./screens/TemplateListScreen";

import { NavigationContainer } from '@react-navigation/native';
import EmailOrPhoneVerificationScreen from './screens/EmailOrPhoneVerificationScreen';

import registerNNPushToken from 'native-notify';

import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react';

import { getTransactions } from "./modules/transactionModule";

const Stack = createNativeStackNavigator();
export default function App() {

    registerNNPushToken(7256, '49XqdeSbyrq5jqZH1ZctRG');

    const transactions = [];

    useEffect(() => {
        const getTransactionList = async () => {
            data = await getTransactions();
            for (let i = 0; i < transactions.length; i++) {

                transactions.push({
                    paymentType: data[i].transaction_type,
                    recipientName: data[i].recipient.name,
                    recipientAccountNumber: data[i].recipient.account_number,
                    recipientPhone: data[i].recipient.phone_number,
                    description: data[i].transaction_purpose,
                    category: data[i].category
                });

            }

        };

        //getTransactionList();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />


                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

                <Stack.Screen name="MyTransactions" component={MyTransactionsScreen} />
                <Stack.Screen name="Template List" component={TemplateListScreen}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.7 }}>
                                    <Icon name="arrow-left" size={16} style={{ fontWeight: '100' }} />
                                    <Text style={{ fontSize: 16 }}>     </Text>
                                </View>

                            </TouchableOpacity>
                        )
                    })} />
                <Stack.Screen
                    name='EmailVerification'
                    component={EmailVerificationScreen}
                />
                <Stack.Screen
                    name='PhoneVerification'
                    component={PhoneVerificationScreen}
                />
                <Stack.Screen
                    name='EmailOrPhoneVerification'
                    component={EmailOrPhoneVerificationScreen}
                />

                <Stack.Screen name='Transaction' component={TransactionScreen} />
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
