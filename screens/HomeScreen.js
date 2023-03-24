import React, { useState } from 'react';
import { Text, View, Image, StyleSheet} from 'react-native';
import AccountBalance from '../components/AccountBalance';
import HomePageButtons from '../components/HomePageButtons';

const HomeScreen = (props) => {

  return (
    <>
        <AccountBalance/>
        <HomePageButtons/>
    </>
  );

};

const styles = StyleSheet.create({
    container: {
    
    },

  });
  

export default HomeScreen;