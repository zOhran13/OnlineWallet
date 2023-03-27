import React, { useState } from 'react';
import { Text, View, StyleSheet,TextInput,Alert,Pressable} from 'react-native';
import { Picker } from '@react-native-picker/picker';



const TransactionScreen = () => {
  const [currency, setCurrency] = useState('US Dollar');
  const [textInputName, setTextInputName] = useState('');
  const [textInputNumber, setTextInputNumber] = useState('');
  const [textInputAmount, setTextInputAmount] = useState('');

  const checkTextInput = () => {

    if (!textInputAmount.trim()) {
      alert('Please Enter Amount!');
      return;
    }
    
    if (!textInputName.trim()) {
      alert('Please Enter Name!');
      return;
    }
   
    if (!textInputNumber.trim()) {
      alert('Please Enter Account Number!');
      return;
    }
    

    //Checked Successfully
    //Do whatever you want
    Alert.alert('Transaction Successful!')
  }

  const getUsers = async () => {
    try {
      let response = await fetch(
        'url sa bekenda/users'
      );
      let json = await response.json();
      return json.users;
    } catch (error) {
       console.error(error);
    }
  };
  
  const getUser = async (id) => {
    try {
      let response = await fetch(
        `url sa bekenda/users/${id}`
      );
      let json = await response.json();
      return json.user;
    } catch (error) {
       console.error(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
      

        <View style={styles.elipseContainer}>
        <Text style={styles.newTransactionText}>New Transaction</Text>
        
     
      <View>
      
        <View style={styles.amountCurrencyContainer}>

        <TextInput style={styles.amountInput} 
          placeholder="Transaction amount" 
          onChangeText={
            (value) => setTextInputAmount(value)
          }
          keyboardType="numeric" placeholderTextColor ='#6e749d'
          />
        <Picker
          selectedValue={currency}
          onValueChange={currentCurrency => setCurrency(currentCurrency)} style={styles.currencyPicker}>
          <Picker.Item label="BAM" value="Bosnian Mark" color='black'/>
          <Picker.Item label="EUR" value="Euro" color='black'/>
          <Picker.Item label="USD" value="US Dollar" color='black'/>
        </Picker>

        </View>

        <TextInput style={styles.input}
          placeholder="Recipient name" 
          placeholderTextColor ='#6e749d'
          onChangeText={
            (value) => setTextInputName(value)
          }
        />
        <TextInput style={styles.input} 
          placeholder="Recipient account number" 
          keyboardType="numeric" 
          placeholderTextColor ='#6e749d'
          onChangeText={
            (value) => setTextInputNumber(value)
        }
        />

        <Text style={styles.selectedCurrencyText}>
          Selected: {currency}
        </Text>
       
      </View>
    
        
        </View>
        <Pressable style={styles.submitButton} onPress={checkTextInput}>
  <Text style={styles.text}>Submit</Text>
</Pressable>
        
      </View>
    </>
  );

};

const styles = StyleSheet.create({
  elipseContainer: {
    borderColor: 'black',
    borderRadius: 50,
    backgroundColor: '#312e66',
    padding: 20,
    margin: 3,
  },
  container: {
    flex: 1,
   backgroundColor: '#1B1938',
   alignItems: 'center',
   justifyContent: 'center',
 },
 input:{

    backgroundColor: '#23204d',
    margin: 4,
    alignItems: 'stretch',
    width: '92%',
    //height: '18%',
    borderRadius: 10,
    padding: 9,
    color: 'white'
 },
 amountCurrencyContainer: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  padding: 1,
  alignItems: 'center'
 },
 currencyPicker: {
    width: '40%',
    height: '10%',
    backgroundColor: '#6e749d',
    marginBottom: 5
 },
 selectedCurrencyText: {
  color: '#6e749d',
  margin: 4,
  padding: 2
 },
 newTransactionText: {
  color: '#b7bace',
  fontWeight: 'bold',
  marginLeft: 4,
  marginBottom: 10,
  padding: 5,
  fontSize: 38
 },
 submitButton:{
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 30,
  width: '50%',
  padding: '5%',
  backgroundColor: '#FFC021',
  margin: 30
 },
 text: {
  fontSize: 20,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: 'black',
},
amountInput: {
  backgroundColor: '#23204d',
  margin: 4,
  alignItems: 'stretch',
  width: '57%',
  height: '85%',
  borderRadius: 10,
  padding: 9,
  color: 'white'
}

});
  

export default TransactionScreen;