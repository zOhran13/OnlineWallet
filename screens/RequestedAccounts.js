import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { getTemplates } from "../modules/templatesModule";
import { BackHandler } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import * as User from "../modules/userModule";
import * as SecureStorage from 'expo-secure-store';
import jwtDecode from "jwt-decode";
import axios from "axios";

const RequestedAccounts = ({ navigation }) => {
    const API_URL = "http://siprojekat.duckdns.org:5051";
    let [accounts, setAccounts] = useState([]);
    let [selectedCurrency, setSelectedCurrency] = useState(null);
    let [currencies, setCurrencies] = useState([{ name: 'No currencies found' }]);
    let [token, setToken] = useState(null);
    let [userId, setUserId] = useState(null);

    const getToken = () => {
        return SecureStorage.getItemAsync("secure_token");
      }
    
    function getAllCurrencies(myToken) {
    return axios(API_URL + '/api/exchangerate/currency', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + myToken,
        },
    });
    }
    
    function getAllAccounts(myToken) {
        return axios(API_URL + '/api/Account/user-accounts', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + myToken,
        },
    });
    }

    useEffect(() => {
        getToken().then(token_ => {
          setToken(token_);
          setUserId(jwtDecode(token_).UserId);
    
          getAllCurrencies(token_).then(response => {
            console.log(response.data);
            setCurrencies(
              response.data.map(u => {
                return {
                  id: u.id,
                  name: u.name,
                };
              })
            );
            setSelectedCurrency(response.data[0].name);
          });
      
          getAllAccounts(token_).then(response => {
            console.log(response.data);
            setAccounts(response.data);
          });
        })
        }, []);

    return (
        <View style={styles.tableContainer}>
            <View style={styles.row}>
              <Text style={styles.header}>Number</Text>
              <Text style={styles.header}>Information</Text>
              <Text style={styles.header}>Status</Text>
              <Text style={styles.header}>Currency</Text>
            </View>
          {accounts.map(account => (
            <View style={styles.row}>
              <Text style={styles.cell}>{account.id}</Text>
              <Text style={styles.cell}>{account.description}</Text>
              <Text style={styles.cell}>{account.approved == false ? "Pending" : "Approved"}</Text>
              <Text style={styles.cell}>{account.currency.name}</Text>
            </View>
          ))} 
        </View>  
      );
    };
    
    const styles = StyleSheet.create({
      tableContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
      },
      row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      header: {
        flex: 1,
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#f2f2f2',
      },
      cell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
      },
    });
export default RequestedAccounts;
