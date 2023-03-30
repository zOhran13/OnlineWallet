import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
  Image,
  ToastAndroid,
  StatusBar,
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const showAlert = (title, errorMsg, desc) =>
    Alert.alert(
      title,
      errorMsg,
      [
        {
          text: 'Ok',
          onPress: () => {
            ToastAndroid.show('Correctly fill all fields', ToastAndroid.SHORT);
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          ToastAndroid.show('Correctly fill all fields', ToastAndroid.SHORT),
      }
    );

  const validateFunction = () => {
    console.log('Validacija');
    if (!(emailOrPhone && password)) {
      showAlert('Blank field error', 'All fields are required!');
      return false;
    } else if (
      !isValidEmail(emailOrPhone) &&
      !isValidPhoneNumber(emailOrPhone)
    ) {
      showAlert('Email or phone error', 'You entered invalid email or phone!');
      return false;
    }
    return true;
  };

  function isValidEmail(email) {
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  }

  function isValidPhoneNumber(number) {
    return number.match(/^\d+$/);
  }

  function handleSignup() {
    console.log('Sign up');
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/images/registration.png')}
          style={styles.picture}
        />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.elipseContainer}>
          <TextInput
            style={styles.input}
            placeholder='Email or phone number'
            placeholderTextColor='#6e749d'
            onChangeText={setEmailOrPhone}
            value={emailOrPhone}
          />

          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor='#6e749d'
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <Pressable
          style={styles.loginButton}
          title='Login'
          onPress={() => {
            if (validateFunction()) {
              console.log('Prijavi se');
              // posalji podatke na Be
              // ako su validni loginuj se, spasi JWT, idi na home page
              // inace prijavi gresku korisniku
            }
          }}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </Pressable>
      </View>
      <Text style={styles.signupText}>
        <Text>Don't have an account? </Text>
        <Text style={{ color: '#ffc022ef' }}>Sign up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight + 20,
    backgroundColor: '#1B1938',
  },
  formContainer: {
    alignItems: 'center',
  },
  elipseContainer: {
    borderColor: 'black',
    borderRadius: 30,
    backgroundColor: '#312e66',
    borderWidth: 2,
    borderColor: '#645CD1',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  picture: {
    width: 350,
    height: 160,
  },
  input: {
    fontSize: 17,
    backgroundColor: '#23204d',
    margin: 4,
    alignItems: 'stretch',
    width: 340,
    height: 45,
    borderRadius: 10,
    padding: 9,
    color: 'white',
  },
  loginButton: {
    marginTop: 13,
    backgroundColor: '#FFC022',
    width: 120,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  signupText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#6e749d',
    marginVertical: 24,
  },

  googleFacebookContainer: {
    gap: 12,
    alignItems: 'center',
  },
  googleText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#555',
  },
  facebookText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: 'white',
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: 300,
    height: 45,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  facebookButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: 300,
    height: 45,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4267B2',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default LoginScreen;
