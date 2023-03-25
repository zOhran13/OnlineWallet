import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Pressable} from 'react-native';
import AccountBalance from '../components/AccountBalance';

const EmailVerificationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AccountBalance/>

<View style={styles.container1}>

<View>

<Pressable style={styles.verifyButton} onPress={() => navigation.navigate("Home")}>
  <Text style={styles.text}>VERIFY</Text>
</Pressable>
</View>

</View>

    </View>
    
  );

};

const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: '#1B1938',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderRadius: 40,
    backgroundColor: '#312e66',
    padding: 50,
    width: '80%',
    marginTop: '80%'
  },
  verifyButton: {
    alignItems: 'center',s
    justifyContent: 'center',
    borderRadius: 30,
    width: 150,
    padding: 20,
    backgroundColor: '#312e66',
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },

});
  

export default EmailVerificationScreen;