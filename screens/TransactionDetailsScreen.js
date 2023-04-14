import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TransactionDetailsScreen() {
  const transaction = {
    transaction_id: 5,
    date: "11.04.2023",
    amount: 2.05,
    currency: "BAM",

    sender: {
      name: "John Doe",
      account_number: "123234",
      bank_name: "Bank of America",
      phone_number: 555333,
      type: "person",
    },

    recipient: {
      name: "Jane Smith",
      account_number: "0987654321",
      bank_name: "Wells Fargo",
      type: "person",
    },

    transaction_type: "B2C",
    transaction_purpose: "fund_transfer",
    category: "Shopping",
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>
        Recipient Name: {transaction.recipient.name}
      </Text>
      <Text style={{ color: "white" }}>
        Recipient Account: {transaction.recipient.account_number}
      </Text>
      <Text style={{ color: "white" }}>Amount: {transaction.amount}</Text>
      <Text style={{ color: "white" }}>
        PaymentType: {transaction.transaction_type}
      </Text>
      <Text style={{ color: "white" }}>Category: {transaction.category}</Text>
      <Text style={{ color: "white" }}>
        Description: {transaction.transaction_purpose}
      </Text>
      <Text style={{ color: "white" }}>
        Transaction ID: {transaction.transaction_id}
      </Text>
      <Text style={{ color: "white" }}>Processed: {transaction.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1938",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    marginTop: 0,
    color: "white",
  },
});
