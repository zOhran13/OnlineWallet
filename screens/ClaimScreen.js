import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,TextInput,Alert,Pressable, Button, Image, ToastAndroid} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker  from 'expo-document-picker';
import * as SecureStorage from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const  ClaimScreen = ({ navigation, route }) => {
  const API_URL = "http://siprojekat.duckdns.org:5051";

  let [token, setToken] = useState(null);
  let [userId, setUserId] = useState(null);
  let [documentArray, setDocumentArray] = useState([]);
  let [subject, setSubject] = useState("");
  let [description, setDescription] = useState("");

  console.log("Current trasaction is: ");
  console.log(route.params.transaction);  

  const getToken = () => {
    return SecureStorage.getItemAsync("secure_token");
  }

  useEffect(() => {
    getToken().then(token_ => {
      setToken(token_);
      setUserId(jwtDecode(token_).UserId);
      //ako bude trebalo nešto drugo dobavljati, to ćemo ovdje obavljati.
    })
	}, []);
  
  
  const pickDocument = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync();
      if (documentArray.filter(element => element.name == document.name).length != 0) {
        Alert.alert("Error", "You already have chosen this document!");
        return;
      }
      documentArray.push(document);
      setDocumentArray([...documentArray]);
      console.log(documentArray);
    } catch(err) {
      console.log(err);
    }
  }
  
  const clearDocumentArray = () => {
    setDocumentArray([]);
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

  function fileTransactionClaim(request, myToken) {
    return axios(API_URL + '/api/transactions/claim', {
      method: 'POST',
      data: request,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + myToken,
      },
    });
  }


  const sendRequest = (myToken) => {
    //fali validacija polja!
    const promiseArray = [];
    console.log("Moj niz dokumenata je: " + JSON.stringify(documentArray));

    for (var i = 0; i < documentArray.length; i++) {
      let formdata = new FormData();
      formdata.append('ContentType', 'application/pdf');
      formdata.append('Folder', '/transactions/claims/' + route.params.transaction.transactionId);
      formdata.append('file', {
        name: documentArray[i].name,
        type: documentArray[i].mimeType,
        uri: documentArray[i].uri
      });

      promiseArray.push(uploadDocument(formdata, myToken));
    }

    Promise.all(promiseArray).then(values => {
      console.log("Vrijednosti koje se vraćaju sa bekenda prilikom upload-a dokumenata:");
      console.log(values);
      const request = {
        transactionId: route.params.transaction.transactionId,
        subject: subject,
        description: description,
        documentIds: values.map(value => value.data) 
      }
      fileTransactionClaim(request, myToken).then(response => {
        console.log("My response on claim raising from BE: ", JSON.stringify(response));
        Alert.alert("Success", "You successfully raised a claim for transaction wit id of " + route.params.transaction.transactionId);
      });
    })
  }
  
  return (
      <View style={styles.container}>
        <View>
            <Image
              source={require("../assets/images/registration.png")}
              style={styles.picture}
            />
        </View>
        <View style={styles.elipseContainer}> 
          <TextInput style={styles.input}
            placeholder="Subject" keyboardType="ascii-capable" placeholderTextColor ='#6e749d'
            onChangeText={(text) => setSubject(text)}  
          />
          <TextInput style={styles.input} 
            placeholder="Description" keyboardType="ascii-capable" placeholderTextColor ='#6e749d'
            onChangeText={(text) => setDescription(text)}
          />
          <Text style={styles.pdf}>Chosen documents: {documentArray.map(el => el.name).toString()}</Text>  
          <Pressable onPress={() => pickDocument()} style={styles.pdfButton}>
            <Image  source={require('../assets/images/pdf.png')}
                    style={styles.iconpdf} />
            <Text style={styles.pdfText}>SELECT DOCUMENT</Text>
          </Pressable>
          <View style={styles.verticleLine}></View>
          <Pressable onPress={() => clearDocumentArray()} style={styles.pdfButton}>
            <Image source={require('../assets/images/pdf.png')}
              style={styles.iconpdf} />
            <Text style={styles.pdfText}>CLEAR</Text>
          </Pressable> 


          <Pressable
            style={styles.claimButton}
            title='Raise_the_claim'
            onPress={() => sendRequest(token)}>					
            <Text style={styles.requestText}>RAISE A CLAIM</Text>
          </Pressable>

          
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    verticleLine:{
      width: '100%',
      height: 5,
      backgroundColor: '#909090',
    },
    iconpdf: {
        width: 24,
        height: 24,
      },
    
      label: {
        fontSize: 16,
        color: "#6e749d",
    
      },
      selected: {
        color: "#6e749d",
        fontSize: 17,
        alignItems: "center",
        
        
      },
      pdfButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        width: 190,
        height: 35,
        borderRadius: 15,
        backgroundColor: '#ffffff',
      },
      pdfText: {
        fontSize: 15,
        letterSpacing: 1,
        color: '#555',
      },

    elipseContainer: {
    borderColor: "black",
    borderRadius: 30,
    backgroundColor: "#312e66",
    borderWidth: 2,
    borderColor: "#645CD1",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",

  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B1938',
  },

  picture: {
    width: 350,
    height: 160,
  },

  claimButton: {
    marginTop: 40,
    backgroundColor: "#FFC022",
    width: 170,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

   input: {
    fontSize: 17,
    backgroundColor: "#23204d",
    marginTop:4,
    marginBottom: 4,
    alignItems: "stretch",
    width: 340,
    height: 45,
    borderRadius: 10,
    padding: 9,
    color: "white",
    
  },

  inputmenu: {
    fontSize: 17,
    backgroundColor: "#23204d",
    margin:4,
    alignItems: "stretch",
    width: 340,
    height: 45,
    borderRadius: 10,
    color: "white",
    
  },
  pdf: {
    fontSize: 17, 
    color: "#6e749d", 
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom:10,
    marginTop:25
    
  },

  requestText: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    
  },

  text: {
    fontSize: 13,
    lineHeight: 13,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "black",
  },
});

export default ClaimScreen;
