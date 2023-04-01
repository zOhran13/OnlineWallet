import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AccountBalance from "./components/AccountBalance";
import HomeScreen from "./screens/HomeScreen";
import TransactionScreen from "./screens/TransactionScreen";
import MyTransactionsScreen from "./screens/MyTransactionsScreen";
import TemplateListScreen from "./screens/TemplateListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Transaction" component={TransactionScreen} />
        <Stack.Screen name="MyTransactions" component={MyTransactionsScreen} />
        <Stack.Screen name="Template List" component={TemplateListScreen} />
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
