import React, { useState } from 'react';
import { Text, View, StyleSheet,TextInput,Alert,Pressable, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';



const RegistrationScreen = () => {
    
  return (
    <>
      <View style={styles.container}>


      <View>
          <Image source={require('../assets/images/registration.png')} style={styles.picture}/>
        </View>

      
        <View style={styles.elipseContainer}>
        <Text style={styles.newTransactionText}></Text>

        <TextInput style={styles.input}
          placeholder="First Name" placeholderTextColor ='#6e749d'
        />
        <TextInput style={styles.input} 
          placeholder="Last Name" keyboardType="text" placeholderTextColor ='#6e749d'/>

<TextInput style={styles.input} 
          placeholder="Username" keyboardType="text" placeholderTextColor ='#6e749d'/>

<TextInput style={styles.input} 
          placeholder="Phone number" keyboardType="numeric" placeholderTextColor ='#6e749d'/>

<TextInput style={styles.input} 
          placeholder="Email" keyboardType="text" placeholderTextColor ='#6e749d'/>

<TextInput style={styles.input} 
          placeholder="Password" keyboardType="text" placeholderTextColor ='#6e749d'/>

<Text style={styles.password}>Use 6 or more characters, mix letters and numbers.</Text> 

<TextInput style={styles.input} 
          placeholder="Confirm Password" keyboardType="text" placeholderTextColor ='#6e749d'/> 
       
      </View>
    
        <Pressable style={styles.registerButton} onPress={() => Alert.alert('Transaction Successful!')}>
  <Text style={styles.text}>REGISTER</Text>
</Pressable>

<Text style={styles.login}>Already have an account? Log in</Text>
        
      </View>
    </>

  );

};

const styles = StyleSheet.create({
  elipseContainer: {
    borderColor: 'black',
    borderRadius: 30,
    backgroundColor: '#312e66',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
  },

 container: {
   flex: 1,
   backgroundColor: '#1B1938',
   alignItems: 'center',
   justifyContent: 'center',
 },

 picture:{
   width: 310,
   height: 140,
 },

 password:{
  fontSize: 10,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: '#6e749d',
  margin: 7,
  marginTop: -6,
  marginBottom: -1,
 },

 login:{
  fontSize: 12,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: '#6e749d',
  margin: 0,
  marginTop: 0,
  marginBottom:6,
 },

 input:{
    backgroundColor: '#23204d',
    margin: 4,
    alignItems: 'stretch',
    width: 275,
    height: 35,
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

 text: {
  fontSize: 13,
  lineHeight: 13,
  fontWeight: 'bold',
  letterSpacing: 2,
  color: 'black',
}
});

export default RegistrationScreen;