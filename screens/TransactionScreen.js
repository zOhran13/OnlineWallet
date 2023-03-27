import React, { useState } from 'react';
import { Text, View, StyleSheet,TextInput,Alert,Pressable} from 'react-native';
import { Picker } from '@react-native-picker/picker';



const TransactionScreen = () => {
  const [currency, setCurrency] = useState('US Dollar');

  
  return (
    <>
      <View style={styles.container}>
      

        <View style={styles.elipseContainer}>
        <Text style={styles.newTransactionText}>New Transaction</Text>
        
     
      <View>
      
        <View style={styles.amountCurrencyContainer}>
        <TextInput style={styles.input}
          placeholder="Recipient account number" keyboardType="numeric" placeholderTextColor ='#6e749d'
        />
        <Picker
          selectedValue={currency}
          onValueChange={currentCurrency => setCurrency(currentCurrency)} style={styles.currencyPicker}>
          <Picker.Item label="BAM" value="Bosnian Mark" color='white'/>
          <Picker.Item label="EUR" value="Euro" color='white'/>
          <Picker.Item label="USD" value="US Dollar" color='white'/>
        </Picker>

        </View>

        <TextInput style={styles.input}
          placeholder="Recipient name" placeholderTextColor ='#6e749d'
        />
        <TextInput style={styles.input} 
          placeholder="Transaction amount" keyboardType="numeric" placeholderTextColor ='#6e749d'/>

        <Text style={styles.selectedCurrencyText}>
          Selected: {currency}
        </Text>
       
      </View>
    
        
        </View>
        <Pressable style={styles.submitButton} onPress={() => Alert.alert('Transaction Successful!')}>
  <Text style={styles.text}>Submit</Text>
</Pressable>
        
      </View>
    </>
  );

};

const styles = StyleSheet.create({
  elipseContainer: {
    borderColor: 'black',
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#312e66',
    padding: 30,

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
    width: 275,
    height: 35,
    borderRadius: 10,
    padding: 9,
    color: 'white'
 },
 amountCurrencyContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
 },
 currencyPicker: {
    width: 110,
    height: 7,
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
  width: 150,
  padding: 20,
  backgroundColor: '#FFC021',
  margin: 30
 },
 text: {
  fontSize: 20,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: 'black',
}

});
  

export default TransactionScreen;