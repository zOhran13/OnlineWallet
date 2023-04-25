import React, { useState } from 'react';
import { Text, View, StyleSheet,TextInput,Alert,Pressable, Button, Image, ToastAndroid} from 'react-native';
import { Picker } from '@react-native-picker/picker';



const  NewAccountCreationScreen = ({ navigation }) => {

   
        const [pdfUri, setPdfUri] = useState(null);
      
        const pickDocument = async () => {
          try {
            const result = await DocumentPicker.pick({
              type: [DocumentPicker.types.pdf],
            });
            setPdfUri(result.uri);
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker
            } else {
              console.log('Error picking PDF:', err);
            }
          }
        }

  const validateFunction = () => {
    console.log("Pozove se")
    if(!(inputs.description && inputs.accountNumber)) {
      showAlert('Blank field error', 'All fields are required!')
      return false
    }
    return true
  }

const [selectedValue, setSelectedValue] = useState('');

  const showAlert = (title, errorMsg, desc) =>{
  Alert.alert(
    title,
    errorMsg,
    [
      {
        text: 'Cancel',
        onPress: () => {
          ToastAndroid.show('Correctly fill all fields', ToastAndroid.SHORT);
        },
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the dialog.',
        ),
    },
  )
}

const onChangeTextHandle = (text, input) => {
    console.log(inputs)
    setInputs(previousObject => ({
      ...previousObject, [input]: text
    }))
  }

  const [errors, setErrors] = useState({})
  const [inputs, setInputs] = useState({
    accountNumber: '',
    description: '',
  })

  
  

  return (
    <> 
      
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
          onChangeText={(text) => onChangeTextHandle(text, 'acount_number')}  
        />
        <TextInput style={styles.input} 
          placeholder="Description" keyboardType="ascii-capable" placeholderTextColor ='#6e749d'
          onChangeText={(text) => onChangeTextHandle(text, 'description')}
        />

    
 <View style={styles.inputmenu}>
               
                <Picker
                    mode="dropdown"
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                    }
                >
        <Picker.Item label="BAM" value="Bosnian Convertible Mark (BAM)" color="#6e749d" />
        <Picker.Item label="USD" value="US dollar (USD)" color="#6e749d" />
        <Picker.Item label="EUR" value="Euro (EUR)" color="#6e749d" />
        <Picker.Item label="AUD" value="Australian Dollar (AUD)" color="#6e749d" />
                </Picker>
            </View>
            <Text style={styles.selected}>{`Selected currency of account:`}</Text>
            <Text style={styles.selected}>{`${selectedValue}`}</Text>
       




    <Text style={styles.pdf}>Upload documents for approval here:</Text>

    
       <Pressable onPress={pickDocument} style={styles.pdfButton}>
          <Image source={require('../assets/images/pdf.png')}
            style={styles.iconpdf} />
            {pdfUri && <Text>{pdfUri}</Text>}
          <Text style={styles.pdfText}>SELECT PDF</Text>
        </Pressable>

   
               <Pressable
					style={styles.verifyButton}
					title='Register_the_account'
					 onPress={() => {
            if(validateFunction()) {
              const requestOption = {
								method: 'POST',
								headers: {
									'accept': 'application/json',
									'Content-Type': 'application/json'
								},
                body: JSON.stringify({
                  accountNumber: inputs.first_name,
                  description: inputs.last_name,
                  email: inputs.email,
                  username: inputs.username,
                  address: "Adress",
                  phoneNumber: inputs.phone
                })
							}
              console.log("Req: " + requestOption.body)
              navigation.navigate("EmailVerification", { 
                isChecked: isChecked,
                username: inputs.username
              });

							fetch("http://siprojekat.duckdns.org:5051/api/User", requestOption).then(res => {
                return res.json();
              }).then(data => {
								console.log(data)
                if(data.message === 'Registration successful'){
                  ToastAndroid.show(JSON.stringify(data.message), ToastAndroid.SHORT);
                  navigation.navigate("EmailVerification", { 
                    isChecked: isChecked,
                    username: inputs.username
                   })
                } else {
                  ToastAndroid.show(JSON.stringify(data.message), ToastAndroid.SHORT);
                }
                
								
							}).catch(err => {
								console.log(err.message)
							})
              
            }
          }}
				>
					<Text style={styles.requestText}>SEND REQUEST</Text>
				</Pressable>

          </View>

        
        </View>
      
    </>
  );
};

const styles = StyleSheet.create({
    
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
