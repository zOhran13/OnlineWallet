import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,TextInput,Alert,Pressable, Button, Image, ToastAndroid} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker  from 'expo-document-picker';
import * as SecureStorage from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const mockAccounts = [
	{ id: '123', description: 'Test account', currency: 'BAM' },
	{ id: '1234', description: 'Test account 2', currency: 'USD' },
];

const  NewAccountCreationScreen = ({ navigation }) => {
  const API_URL = "http://siprojekat.duckdns.org:5051";
  let [accountNumber, setAccountNumber] = useState(null);
  let [description, setDescription] = useState(null);
  let [documentArray, setDocumentArray] = useState([]);
  let [accounts, setAccounts] = useState(mockAccounts);
  let [change, setChange] = useState(false);
  let [userId, setUserId] = useState(null);
  let [token, setToken] = useState(null);
  let [selectedCurrency, setSelectedCurrency] = useState(null);
  const [currencies, setCurrencies] = useState([{ name: 'No currencies found' }]);
  
  const getToken = () => {
    return SecureStorage.getItemAsync("secure_token");
  }

  function getAllCurrencies(myToken) {
    return axios(API_URL + '/api/exchangerate/currency', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + myToken,
      },
    });
  }

  function getAllAccounts(myToken) {
    return axios(API_URL + '/api/Account/user-accounts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + myToken,
      },
    });
  }
  

  useEffect(() => {
    getToken().then(token_ => {
      setToken(token_);
      setUserId(jwtDecode(token_).UserId);

      getAllCurrencies(token_).then(response => {
        console.log(response.data);
        setCurrencies(
          response.data.map(u => {
            return {
              id: u.id,
              name: u.name,
            };
          })
        );
        setSelectedCurrency(response.data[0].name);
      });
  
      getAllAccounts(token_).then(response => {
        console.log(response.data);
        setAccounts(response.data);
      });
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
  
  function findCurrencyByName(curr) {
		for (var i = 0; i < currencies.length; i++) {
			if (currencies[i].name == curr) return currencies[i].id;
		}
		return null;
	}

  const changeStates = (value, attributeToChange) => {
    switch (attributeToChange) {
      case "accountNumber": 
        setAccountNumber(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "currency": 
        setSelectedCurrency(value);
        break;
      default:
        throw new Error("This is some error!");
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

  function createAccount(data, myToken) {
    return axios(API_URL + '/api/Account/user-account-create', {
      method: 'POST',
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
         Authorization: 'Bearer ' + myToken,
      },
    });
  }


  const sendRequest = (myToken) => {
    let currency_id = findCurrencyByName(selectedCurrency);

		if (accountNumber && currency_id && description && accountNumber != '' && description != '') {

			if (documentArray.length != 0) {
				console.log("Moj niz dokumenata je: " + JSON.stringify(documentArray));
				for (var i = 0; i < documentArray.length; i++) {
					let formdata = new FormData();
					formdata.append('ContentType', 'application/pdf');
					formdata.append('Folder', '/user-requests/' + accountNumber);
					formdata.append('file', {
            name: documentArray[i].name,
            type: documentArray[i].mimeType,
            uri: documentArray[i].uri
          });

          console.log("ovo je moj formdata ispod:");
					//for (let pair of formdata.entries()) {
						//console.log(pair[0]);
						//console.log(pair[1]);
					//}
					uploadDocument(formdata, myToken).then(res => {
            console.log("Uploadovao sam dokument, ovo je moj odgovor na request:");
						console.log(res);
					});
				}
			}

			let objectData = {
				accountNumber: accountNumber,
				currencyId: currency_id,
				description: description,
				requestDocumentPath: documentArray.length != 0 ? '/user-requests/' + accountNumber : 'null',
				approved: false,
				userId: userId,
			};
			console.log(objectData);
			createAccount(objectData, myToken).then(res => {
        console.log("Kreirao sam račun. Odgovor od servera: ");
        console.log(res);
				setAccounts([...accounts, res.data]);
				setAccountNumber(null);
				setSelectedCurrency(currencies[0].name);
				setDescription(null);
        Alert.alert("Success!", "You successfully requested an account creation.");
			});
		} else {
			Alert.alert("Invalid input data!");
		}
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
            placeholder="Account Number" keyboardType="ascii-capable" placeholderTextColor ='#6e749d'
            onChangeText={(text) => changeStates(text, "accountNumber")}  
          />
          <TextInput style={styles.input} 
            placeholder="Description" keyboardType="ascii-capable" placeholderTextColor ='#6e749d'
            onChangeText={(text) => changeStates(text, "description")}
          />
          <View style={styles.inputmenu}>        
                <Picker
                      mode="dropdown"
                      selectedValue={selectedCurrency}
                      onValueChange={(itemValue) =>
                        changeStates(itemValue, "currency")
                      }
                  >
                  {currencies.map(currency => (
                    <Picker.Item label={currency.name} value={currency.name} color="#6e749d"/>))}
                </Picker>
          </View>
          <Text style={styles.selected}>Selected currency of account:</Text>
          <Text style={styles.selected}>{selectedCurrency}</Text>
          <Text style={styles.pdf}>Chosen documents: {documentArray.map(el => el.name).toString()}</Text>  
          <Pressable onPress={() => pickDocument()} style={styles.pdfButton}>
            <Image  source={require('../assets/images/pdf.png')}
                    style={styles.iconpdf} />
            <Text style={styles.pdfText}>SELECT PDF</Text>
          </Pressable>
          <View style={styles.verticleLine}></View>
          <Pressable onPress={() => clearDocumentArray()} style={styles.pdfButton}>
            <Image source={require('../assets/images/pdf.png')}
              style={styles.iconpdf} />
            <Text style={styles.pdfText}>CLEAR</Text>
          </Pressable>   
          <Pressable
            style={styles.verifyButton}
            title='Register_the_account'
            onPress={() => sendRequest(token)}>					
            <Text style={styles.requestText}>SEND REQUEST</Text>
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
        width: 135,
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

  verifyButton: {
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
    marginTop:40
    
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

export default NewAccountCreationScreen;
