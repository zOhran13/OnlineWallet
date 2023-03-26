import React, { useState } from 'react';
import { Text, View, StyleSheet,TextInput,Alert,Pressable, Image} from 'react-native';
import Checkbox from 'expo-checkbox';


const RegistrationScreen = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <>
      <View style={styles.container}>


      <View>
          <Image source={require('../assets/images/registration.png')} style={styles.picture}/>
      </View>

      
      <View style={styles.elipseContainer}>
      <Text style={styles.newTransactionText}></Text>

      <TextInput style={styles.input}
          placeholder="First Name" placeholderTextColor ='#6e749d'/>

      <TextInput style={styles.input} 
          placeholder="Last Name" keyboardType="default" placeholderTextColor ='#6e749d'/>

      <TextInput style={styles.input} 
          placeholder="Username" keyboardType="default" placeholderTextColor ='#6e749d'/>

      <TextInput style={styles.input} 
          placeholder="Phone number" keyboardType="numeric" placeholderTextColor ='#6e749d'/>

      <View style={styles.container1}>
     
     <View style={styles.section}>
       <Checkbox
         style={styles.checkbox}
         value={isChecked}
         onValueChange={setChecked}
         color={isChecked ? '#6e749d' : undefined}
       />
       <Text style={styles.paragraph}>Send verification code to my phone number.</Text>
      </View>
    
      </View>

        <TextInput style={styles.input} 
          placeholder="Email" keyboardType="email-address" placeholderTextColor ='#6e749d'/>

<TextInput style={styles.input} 
          placeholder="Password" keyboardType="default" placeholderTextColor ='#6e749d'secureTextEntry/ >
         
<Text style={styles.password}>Use 6 or more characters, mix letters and numbers.</Text> 

<TextInput style={styles.input} 
          placeholder="Confirm Password" keyboardType="default" placeholderTextColor ='#6e749d' secureTextEntry/> 
         
      </View>

        <Pressable
					style={styles.verifyButton}
					title='Register'
					onPress={() => navigation.navigate("EmailVerification")}
				>
					<Text style={styles.registerText}>REGISTER</Text>
				</Pressable>

        <Text style={styles.login}>Already have an account? Log in</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 14,
    color:'#6e749d',
    letterSpacing: 0.25,
  },
  checkbox: {
    margin: 8,
  },
  
  elipseContainer: {
    borderColor: 'black',
    borderRadius: 30,
    backgroundColor: '#312e66',
    borderWidth: 2,
		borderColor: '#645CD1',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 22,
  },

 container: {
   flex: 1,
   backgroundColor: '#1B1938',
   alignItems: 'center',
   justifyContent: 'center',
  
 },

 picture:{
  marginTop: -13,
   width: 350,
   height: 160,
 },

 password:{
  fontSize: 14,
  lineHeight: 21,
  letterSpacing: 0.25,
  color: '#6e749d',
  margin: 7,
  marginTop:1,
  marginBottom: 2,
 },

 verifyButton: {
  marginTop: 13,
  backgroundColor: '#FFC022',
  width: 120,
  height: 35,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
  
},

 login:{
  fontSize: 14,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: '#6e749d',
  margin: 0,
  marginTop: 9,
  marginBottom:6,
 },

 input:{
    fontSize: 18,
    backgroundColor: '#23204d',
    margin: 4,
    alignItems: 'stretch',
    width: 320,
    height: 48,
    borderRadius: 10,
    padding: 9,
    color: 'white'
 },

 registerButton:{
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 30,
  width: 116,
  padding: 20,
  backgroundColor: '#FFC021',
  margin: 7,
  marginBottom: -2,

 },

 registerText: {
  fontSize: 18,
  fontWeight: 'bold',
  letterSpacing: 1,
},

 text: {
  fontSize: 13,
  lineHeight: 13,
  fontWeight: 'bold',
  letterSpacing: 2,
  color: 'black',
}
});

export default RegistrationScreen;