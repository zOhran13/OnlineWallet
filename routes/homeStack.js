import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TransactionScreen from './screens/TransactionScreen';

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

export default NavigationContainer(Stack);