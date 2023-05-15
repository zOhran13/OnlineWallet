import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList,ScrollView, TextInput, TouchableOpacity } from 'react-native';

const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Armin', text: 'Takodjer odlicno' },
    { id: 2, sender: 'Benjamin', text: 'Odlicno, brate moj, kako si ti?' },
    { id: 3, sender: 'Armin', text: 'Hej Azma, kako si?' },
    // Placeholderi
  ]);

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={item.sender === 'Armin' ? styles.messageBubbleA : styles.messageBubbleB}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.text}</Text>
      </View>
    </View>
  );

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const newId = messages.length+1;
      const newSender = 'Benjamin';
      const newMessageObj = { id: newId, sender: newSender, text: newMessage.trim() };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat Screen</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.messagesContainer}
        />
      </ScrollView>

      <View style={styles.inputContainer}>
         <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f1f1',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  messagesContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  messageContainer: {
    marginBottom: 8,
  },
  messageBubbleA: {
    backgroundColor: '#377dff',
    borderRadius: 8,
    padding: 8,
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  messageBubbleB: {
    backgroundColor: '#213502',
    borderRadius: 8,
    padding: 8,
    alignSelf: 'flex-end',
    maxWidth: '70%',
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  message: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    backgroundColor:
    '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  sendButtonText: {
    color: '#377dff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollView: {
    flexGrow: 1,
  },

});

export default ChatScreen;
