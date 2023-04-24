import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

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
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{transaction.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction Type:</Text>
            <Text style={styles.value}>{transaction.transaction_type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction Purpose:</Text>
            <Text style={styles.value}>{transaction.transaction_purpose}</Text>
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
            <Text style={styles.value}>{transaction.sender.bank_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Account number:</Text>
            <Text style={styles.value}>{transaction.sender.account_number}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone number:</Text>
            <Text style={styles.value}>{transaction.sender.phone_number}</Text>
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
            <Text style={styles.value}>{transaction.recipient.bank_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Account number:</Text>
            <Text style={styles.value}>{transaction.recipient.account_number}</Text>
          </View>
        </View>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    marginTop: 20,
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: "#2E2C4A",
    borderRadius: 10,
    padding: 20,
    marginTop: 0,
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
