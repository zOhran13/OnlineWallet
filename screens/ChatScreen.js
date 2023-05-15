import React, { useState } from 'react';
import * as ClaimService from '../modules/claimsModule';
import * as DocumentPicker  from 'expo-document-picker';
import jwtDecode from 'jwt-decode';
import { StyleSheet, View, Text, FlatList,ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

const ChatScreen = ({ route }) => {
  const API_URL = "http://siprojekat.duckdns.org:5051";
  const FILE_SERVER_URL = 'http://siprojekat.duckdns.org:8081';
  const [claimMeta, setClaimMeta] = useState(route.params.claim);
  const [documentsMeta, setDocumentsMeta] = useState(null);
  const [document, setDocument] = useState(null);
  const [token, setToken] = useState(route.params.token);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(jwtDecode(token).UserId);
  const [username, setUsername] = useState(jwtDecode(token).UserName);
  const [loaded, setLoaded] = useState(false);

  function messageFetching() {
    ClaimService.getSingleClaim(token, claimMeta.id).then(claim => {
      if (messages.length == claim.data.messages.length)
        return;
      console.log("Claim koji dobijemo u cijelosti je: ");
      console.log(claim.data);
      setDocumentsMeta(claim.data.documents);
      console.log("Dokumenti");
      console.log(claim.data.documents);
      setMessages(claim.data.messages);
      console.log("Poruke:");
      console.log(claim.data.messages);
      setLoaded(true);
    });
  }

  const pickDocument = async () => {
    try {
      const pickedDocument = await DocumentPicker.getDocumentAsync();      
      setDocument(pickedDocument);
      console.log(pickedDocument);
    } catch(err) {
      console.log(err);
    }
  }

  function uploadDocument(data, myToken) {
    return axios(API_URL + '/api/Document/UploadDocument', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + myToken
      },
      data: data
    });
  }

  React.useEffect(() => {
    messageFetching();
  }, []);

  const downloadDocument = async (docForDownload) => {
    console.log(FileSystem.documentDirectory);
    console.log(FILE_SERVER_URL + docForDownload.unc.slice(8));
    const result = await FileSystem.downloadAsync(FILE_SERVER_URL + docForDownload.unc.slice(8), FileSystem.documentDirectory + docForDownload.fileName);
    save(result.uri);
  }

  const save = (uri) => {
    shareAsync(uri);
    console.log("Završen download!");
  }

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={item.userId === userId ? styles.messageBubbleB : styles.messageBubbleA}>
        <Text style={styles.sender}>{item.userName}</Text>
        {item.documents.length != 0 ? <Text onPress={() => downloadDocument(item.documents[0])} style={styles.message}>{item.message}</Text> : <Text style={styles.message}>{item.message}</Text>}
      </View>
    </View>
  );

  const sendMessage = () => {
    if (document != null) {
      let formdata = new FormData();
      formdata.append('ContentType', 'application/pdf');
      formdata.append('Folder', '/transactions/claims/' + claimMeta.transactionId + "/" + claimMeta.id);
      formdata.append('file', {
        name: document.name,
        type: document.mimeType,
        uri: document.uri
      });
      uploadDocument(formdata, token).then(response => {
        ClaimService.addClaimMessage(token, {
          transactionClaimId: claimMeta.id,
          message: "RESOURCE: " + document.name,
          documentIds: [response.data]
        }).then(response => {
          console.log("My response:");
          console.log(response);
          messageFetching();
        })
        setDocument(null);
      });
    } else {
      if (newMessage.trim() !== '') {
        const newMessageObj = { 
          documents: [],
          message: newMessage,
          transactionClaimId: claimMeta.id,
          userId: userId,
          userName: username
        };
        setNewMessage('');
  
        //za sada bez dokumenata, dokumente dodati kasnije!
        ClaimService.addClaimMessage(token, {
          transactionClaimId: newMessageObj.transactionClaimId,
          message: newMessageObj.message,
          documentIds: []
        }).then(response => {
          console.log("My response:");
          console.log(response);
          messageFetching();
        })
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {document != null ? <Text style={styles.title}>Upload: {document.name}</Text> : <Text></Text>}
        <Button onPress={() => messageFetching()}><Text>Fetch messages</Text></Button>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loaded == true ? <FlatList
          data={messages}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContainer}
        /> : <View><Text style={styles.title}>Loading...</Text></View>}
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
        <Button onPress={() => pickDocument()}>Upload document</Button>
      </View>
    </View>
  )
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
