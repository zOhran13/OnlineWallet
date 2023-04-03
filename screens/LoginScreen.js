import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
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
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';
import Expo from "expo";
import { FontAwesome5 } from '@expo/vector-icons';

export default LoginScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const [_, __, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: "1370313683731054"
  });

  const [___, _____, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: "788342956193-siinksvah4o472pb4b7i9us94pi2lttm.apps.googleusercontent.com",
    androidClientId: "788342956193-35v68vd43enipuckknkthkt3t7kihn7e.apps.googleusercontent.com"
  });

  const facebookRegister = async () => {
    const response = await fbPromptAsync();
    if (response.type === "success") {
      const { access_token } = response.params;
      return access_token;
    }
    return null;
  };

  const googleRegister = async () => {
    try {
      const result = await googlePromptAsync();

      if (result.type === "success") {
        return result.authentication.accessToken;
      } else {
        console.log("prekinuto!");
      }
    } catch (e) {
      console.log("Desila se greška: ", e);
    }
    return null;
  }

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
    navigation.navigate('Registration');
  }

  async function handleGoogleLogin() {
    let socialTokenString = await SecureStore.getItemAsync('social_token');
    let socialToken = null;

    if (socialTokenString == "" || socialTokenString == null) {
      const tokenValue = await googleRegister();
      socialToken = {
        "name": "google_token",
        "value": tokenValue
      };
      await SecureStore.setItemAsync("social_token", JSON.stringify(socialToken));
    } else {
      socialToken = JSON.parse(socialTokenString);
      if (socialToken.name != 'google_token') {
        Alert.alert(
          'Google login error',
          'You are already registered with another social account!'
        );
        return;
      }
    }

    //ovdje dobavljamo podatke sa BE, i ako je validan korisnik (dobijemo validan odgovor)
    //onda se logujemo dalje na stranicu
    //ovdje privremeno dobavljamo podatke sa facebook-a, jer nije gotov BE!
    console.log("Moj token je:");
    console.log(socialToken);

    let data = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${socialToken.value}` },
    }).then(res => res.json());

    console.log("Vraćeni podaci su: ");
    console.log(data);

    navigation.navigate('Home');
  }

  async function handleFacebookLogin() {
    let socialTokenString = await SecureStore.getItemAsync('social_token');
    let socialToken = null;

    if (socialTokenString == "" || socialTokenString == null) {
      const tokenValue = await facebookRegister();
      socialToken = {
        "name": "facebook_token",
        "value": tokenValue
      };
      await SecureStore.setItemAsync("social_token", JSON.stringify(socialToken));
    } else {
      socialToken = JSON.parse(socialTokenString);
      if (socialToken.name != 'facebook_token') {
        Alert.alert(
          'Facebook login error',
          'You are already registered with another social account!'
        );
        return;
      }
    }

    //ovdje dobavljamo podatke sa BE, i ako je validan korisnik (dobijemo validan odgovor)
    //onda se logujemo dalje na stranicu
    //ovdje privremeno dobavljamo podatke sa facebook-a, jer nije gotov BE!
    console.log(socialToken);
    let data = await fetch("https://graph.facebook.com/me?fields=last_name,first_name,email&access_token=" + socialToken.value).then(res => res.json());
    console.log(data);
    navigation.navigate('Home');
  }

  function handleMicrosoftLogin() {
    Alert.alert(
      'Login with Microsoft',
      'Login with Microsoft button was pressed'
    );
  }

  return (

    <><View style={styles.container}>
      <View>
        <Image
          source={require('../assets/images/registration.png')}
          style={styles.picture} />
      </View>

    <View style={styles.formContainer}>
        <View style={styles.elipseContainer}>
          <TextInput
            style={styles.input}
            placeholder='Email or phone number'
            placeholderTextColor='#6e749d'
            onChangeText={setEmailOrPhone}
            value={emailOrPhone} />

          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor='#6e749d'
            secureTextEntry
            onChangeText={setPassword}
            value={password} />
        </View>
        <Pressable
          style={styles.loginButton}
          onPress={() => {
            if (validateFunction()) {
              let requestOption = {};
              if (isValidEmail(emailOrPhone)) {
                requestOption = {
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    email: emailOrPhone,
                    password: password
                  })
                };
              } else if (isValidPhoneNumber()) {
                requestOption = {
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    phone: emailOrPhone,
                    password: password
                  })
                };
              }

              fetch("http://localhost:5051/api/User/login", requestOption).then(response => {
                return response.json();
              }).then(data => {
                if (data.message === 'We have sent verification code to your email.') {
                  ToastAndroid.show('Correctly fill all fields', ToastAndroid.SHORT);
                  navigation.navigate('EmailOrPhoneVerification');
                }
              }).catch(err => {
                ToastAndroid.show('Error while sending code to ' + emailOrPhone, ToastAndroid.SHORT);
              });
              navigation.navigate('Home');
              // posalji podatke na Be
              // ako su validni loginuj se, spasi JWT, idi na home page
              // inace prijavi gresku korisniku
            }
          }}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </Pressable>
      </View><View style={styles.horizontalSeparatorContainer}>
        <View style={styles.horizontalBar} />
        <Text style={styles.signupText}>Or</Text>
        <View style={styles.horizontalBar} />
      </View><View style={styles.alternativeLoginContainer}>
        <Pressable onPress={handleFacebookLogin} style={styles.facebookButton}>
          <FontAwesome5 name='facebook' size={24} color='white' />
          <Text style={styles.facebookText}>Login with Facebook</Text>
        </Pressable>
        <Pressable onPress={handleGoogleLogin} style={styles.googleButton}>
          <Image
            source={require('../assets/images/google_icon.png')}
            style={styles.icon} />
          <Text style={styles.googleText}>Login with Google</Text>
        </Pressable>
        <Pressable onPress={handleMicrosoftLogin} style={styles.googleButton}>
          <Image
            source={require('../assets/images/microsoft_icon.png')}
            style={styles.icon} />
          <Text style={styles.googleText}>Login with Microsoft</Text>
        </Pressable>
      </View><Text style={styles.signupText}>
        <Text>Don't have an account? </Text>
        <Text style={{ color: '#ffc022ef' }} onPress={handleSignup}>
          Sign up
        </Text>
      </Text>
      </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginVertical: 16,
  },

  alternativeLoginContainer: {
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
  horizontalSeparatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginHorizontal: 20,
  },
  horizontalBar: {
    flex: 1,
    height: 1,
    backgroundColor: '#6e749d',
  },
});
