import React, { useState } from 'react';
import { Text, View, StyleSheet,TextInput,Alert,Pressable, Image, ScrollView, ToastAndroid} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from "expo-checkbox";


const RegistrationScreen = ({ navigation }) => {

  const showAlert = (title, errorMsg, desc) =>
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
  );

  
  const [errors, setErrors] = useState({})
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    password_confirmation: '',
    last_name: '',
    first_name: '',
    phone: ''
  })

  const validateFunction = () => {
    console.log("Pozove se")
    if(!(inputs.username && inputs.email && inputs.last_name && inputs.first_name && inputs.password && inputs.password_confirmation)) {
      showAlert('Blank field error', 'All fields are required!')
      return false
    } else if(inputs.username.length < 2) {
      showAlert('Username error', 'Username must have more than 2 letters')
      return false
    }else if(!inputs.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      showAlert('Email error', 'You entered invalid email!')
      return false
    } else if(!inputs.password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)){
      showAlert('Password error', 'Password needs 8 letters, at least a symbol, upper and lower case with number!')
      return false
    } else if(inputs.password != inputs.password_confirmation){
      showAlert('Password confirmation error', 'Passwords must be the same!')
      return false
    } else if(!inputs.phone){
      showAlert('Phone number field must be filled!')
      return false
    }
    return true
  }

  const onChangeTextHandle = (text, input) => {
    console.log(inputs)
    setInputs(previousObject => ({
      ...previousObject, [input]: text
    }))
  }



  const [isChecked, setChecked] = useState(false);
  return (
    <>
      <ScrollView style={styles.scrollableContainer}>
        <View style={styles.container}>
          <View>
            <Image
              source={require("../assets/images/registration.png")}
              style={styles.picture}
            />
          </View>

          <View style={styles.elipseContainer}>
            <Text style={styles.newTransactionText}></Text>

        <TextInput style={styles.input}
          placeholder="First Name" placeholderTextColor ='#6e749d'
          onChangeText={(text) => onChangeTextHandle(text, 'first_name')}  
        />
        <TextInput style={styles.input} 
          placeholder="Last Name" keyboardType="ascii-capable" placeholderTextColor ='#6e749d'
          onChangeText={(text) => onChangeTextHandle(text, 'last_name')}
        />

        <TextInput style={styles.input} 
              placeholder="Username" 
              keyboardType="ascii-capable" 
              placeholderTextColor ='#6e749d'
              onChangeText={(text) => onChangeTextHandle(text, 'username')} />

            <TextInput
              style={styles.input}
              placeholder="Phone number"
              keyboardType="number-pad"
              placeholderTextColor="#6e749d"
              onChangeText={(text) => onChangeTextHandle(text, 'phone')}
            />
            <View style={styles.container1}>
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? "#6e749d" : undefined}
                />
                <Text style={styles.paragraph}>
                  Send verification code to my phone number.
                </Text>
              </View>
            </View>
        <TextInput style={styles.input} 
              placeholder="Email" 
              keyboardType="email-address" 
              placeholderTextColor ='#6e749d'
               onChangeText={(text) => onChangeTextHandle(text, 'email')}/>

        <TextInput style={styles.input} 
              placeholder="Password" 
              keyboardType="ascii-capable" 
              placeholderTextColor ='#6e749d'
              secureTextEntry
               onChangeText={(text) => onChangeTextHandle(text, 'password')}/>
              
        <Text style={styles.password}>Use 8 or more characters, mix letters and numbers.</Text> 

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              keyboardType="ascii-capable"
              placeholderTextColor="#6e749d"
              secureTextEntry
              onChangeText={(text) => onChangeTextHandle(text, 'password_confirmation')}
            />
          </View>

        <Pressable
					style={styles.verifyButton}
					title='Register'
					 onPress={() => {
            if(validateFunction()) {
              const requestOption = {
								method: 'POST',
								headers: {
									'accept': 'application/json',
									'Content-Type': 'application/json'
								},
                body: JSON.stringify({
                  firstName: inputs.first_name,
                  lastName: inputs.last_name,
                  email: inputs.email,
                  username: inputs.username,
                  password: inputs.password,
                  address: 'Adress',
                  phoneNumber: inputs.phone
                })
							}
              console.log("Req: " + requestOption.body)
							fetch("https://8f74-77-77-219-0.eu.ngrok.io/Register", requestOption).then(response => {
								return response.json()
							}).then(data => {
								ToastAndroid.show(JSON.stringify(data), ToastAndroid.SHORT);
                navigation.navigate("EmailVerification", { 
                  isChecked: isChecked,
                  username: inputs.username
                 })
								console.log("Uraditi nesto sa: " + JSON.stringify(data))
							}).catch(err => {
								console.log(err.message)
							})
              
            }
          }}
				>
					<Text style={styles.registerText}>REGISTER</Text>
				</Pressable>

          <Text style={styles.login}>Already have an account? Log in</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 14,
    color: "#6e749d",
    letterSpacing: 0.25,
  },
  checkbox: {
    margin: 8,
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
  },

  container: {
    flex: 1,
    backgroundColor: "#1B1938",
    alignItems: "center",
    justifyContent: "center",
  },

  picture: {
    width: 350,
    height: 160,
  },

  password: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#6e749d",
    margin: 7,
    marginTop: 1,
    marginBottom: 2,
  },

  verifyButton: {
    marginTop: 13,
    backgroundColor: "#FFC022",
    width: 120,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  login: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#6e749d",
    marginTop: 9,
    marginBottom: 100,
  },

  input: {
    fontSize: 17,
    backgroundColor: "#23204d",
    margin: 4,
    alignItems: "stretch",
    width: 340,
    height: 45,
    borderRadius: 10,
    padding: 9,
    color: "white",
  },

  registerButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: 116,
    padding: 20,
    backgroundColor: "#FFC021",
    margin: 7,
  },

  registerText: {
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

export default RegistrationScreen;
