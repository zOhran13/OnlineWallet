import React, { useState } from 'react';
import { Text, View, Image, StyleSheet} from 'react-native';

const AccountBalance = () => {
  const [balance, setBalance] = useState(1000);

  return (
    <View>
        <View style={styles.balanceValueComponent}>
            <Text style={styles.balanceText}>Total balance</Text>
            <Text>{balance}</Text>
        </View>
      <Image source={require('../assets/images/WalletPicture.png')} style={styles.picture}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        
    },
    picture: {
      marginTop: -50,
      marginLeft: 110,
      marginRight: -130,
      marginBottom: 400

    },
    balanceText: {
        color: 'white',
        fontFamily: 'Georgia',
        fontSize: 32
      

    },
    balanceValueComponent: {
      borderWidth: 2,
      borderColor: 'black',
      padding: 16,
      borderRadius: 50,
      backgroundColor: '#312e66',
      padding: 50
    }

  });
  

export default AccountBalance;