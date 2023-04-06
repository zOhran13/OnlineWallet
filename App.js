
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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TemplateListScreen from "./screens/TemplateListScreen";
import { NavigationContainer } from '@react-navigation/native';
import EmailOrPhoneVerificationScreen from './screens/EmailOrPhoneVerificationScreen';

const Stack = createNativeStackNavigator();
//<Stack.Screen name='Login' component={LoginScreen} />
        //<Stack.Screen name="Registration" component={RegistrationScreen}/>
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
              
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        
        <Stack.Screen name="MyTransactions" component={MyTransactionsScreen} />
        <Stack.Screen name="Template List" component={TemplateListScreen} />
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
    backgroundColor: "#1B1938",
    alignItems: "center",
    justifyContent: "center",
  },
});
