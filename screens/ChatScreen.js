import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ChatScreen = ({ route }) => {
  const { id, subject } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Screen</Text>
      <Text style={styles.subtitle}>ID: {id}</Text>
      <Text style={styles.subtitle}>Subject: {subject}</Text>
        {
            /* css za chat UI */
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ChatScreen;
