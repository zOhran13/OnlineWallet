import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AccountBalance from './components/AccountBalance';
import HomeScreen from './screens/HomeScreen';
import TransactionScreen from './screens/TransactionScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{title: 'Transaction'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <HomeScreen/>
      </View>
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