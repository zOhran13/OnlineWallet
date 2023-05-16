import React, { useState, useEffect } from "react";
import { getVendors } from "../modules/vendorsModule";
import { getEInvoiceRequiredData, registerNewEInvoice } from "../modules/einvoiceModule";

import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Alert,
    Pressable,
    Image,
    ScrollView,
    Keyboard
} from "react-native";

import { Picker } from "@react-native-picker/picker";

const EInvoiceRegistrationScreen = ({ navigation }) => {

    const [param1, setParam1] = useState("");
    const [param3, setParam3] = useState("");
    const [param2, setParam2] = useState("");
    const [param4, setParam4] = useState("");

    const [company, setCompany] = useState("");
    const [selectedCompany, setSelectedCompany] = useState({companyName: "Company", param1: null, param2: null, param3: null, param4: null});
    const [listOfCompanies, setListOfCompanies] = useState([]);
    const [eInvoiceRegistrationRequiredData, setEInvoiceRegistrationRequiredData] = useState({});
    
    useEffect(() => {
        const fetchVendors = async () => {
            const data = await getVendors();
            console.log("Evo nekih vendora: ", data);

            setListOfCompanies(data);
        };
        fetchVendors();

    }, []);


    const checkTextEmpty = () => {


        if (param1 && !param1.trim()) {
            alert("Please Enter " + selectedCompany.param1);
            return false;
        }
        if (param2 && !param2.trim()) {
            alert("Please Enter " + selectedCompany.param2);
            return false;
        }

        if (param3 && !param3.trim()) {
            alert("Please Enter " + selectedCompany.param3);
            return false;
        }

        if (param4 && !param4.trim()) {
            alert("Please Enter " + selectedCompany.param4);            
            return false;
        }


        return true;
    }

    const checkAndSubmitRegistration = async () => {
        if (checkTextEmpty()) {
            registerNewEInvoice(company, param1, param2, param3, param4);
            Alert.alert("E-Invoice registration successfully sent!")
        }

    }



    const companiesArray=[{companyName: "Company", param1: null, param2: null, param3: null, param4: null},
    {companyName: "Vodovod", param1: "JMBG", param2: "imePrezime", param3: "god_rodjenja", param4: "ljubimac"},
    {companyName: "Struja", param1: "JMBG", param2: "imePrezime", param3: "god_rodjenja", param4: null},
    {companyName: "Plin", param1: "JMBG", param2: "imePrezime", param3: null, param4: null},
    {companyName: "Smeće", param1: "JMBG", param2: "imePrezime", param3: "god_rodjenja", param4: null},
    {companyName: "Oki", param1: "JMBG", param2: "imePrezime", param3: "god_rodjenja", param4: null},
    {companyName: "Higijeničar", param1: "JMBG", param2: "imePrezime", param3: "god_rodjenja", param4: null},
    {companyName: "Slastičarna", param1: "JMBG", param2: "imePrezime", param3: "god_rodjenja", param4: null}];

    let serviceItems = listOfCompanies.map( (s, i) => {
        
        return <Picker.Item key={i} value={s.name} label={s.name} />
    });

    return (
        <>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={true}>
                <View style={styles.container}>

                    <View style={styles.elipseContainer}>
                       
                        

                        <Picker
                                selectedValue={company}
                                onValueChange={(company) => {
                                    setCompany(company);
                                    setSelectedCompany(listOfCompanies.find(data => data.name===company));
                                    setParam1(null);
                                    setParam2(null);
                                    setParam3(null);
                                    setParam4(null);
                                    const fetchEInvoiceRequiredData = async () => {
                                        const data = await getEInvoiceRequiredData(company);                            
                                        setEInvoiceRegistrationRequiredData(data);
                                    };
                                    fetchEInvoiceRequiredData();
                                    
                                }
                                }

                                style={styles.categoryPicker}
                            >
                                {serviceItems}

                            </Picker>

                            <View style={styles.inputFieldsContainer}>
                            {eInvoiceRegistrationRequiredData.field1!=null && (
                            <TextInput
                                style={styles.input}
                                placeholder={eInvoiceRegistrationRequiredData.field1}
                                placeholderTextColor="#6e749d"
                                value={param1}
                                onChangeText={(value) => {
                                    setParam1(value);
                                }
                                }
                            />)}

                            {eInvoiceRegistrationRequiredData.field2!=null && (
                            <TextInput
                                style={styles.input}
                                placeholder={eInvoiceRegistrationRequiredData.field2}
                                placeholderTextColor="#6e749d"
                                value={param2}
                                onChangeText={(value) => {
                                    setParam2(value)
                                }}
                            />)}


                            {eInvoiceRegistrationRequiredData.field3!=null && (
                            <TextInput
                                style={styles.input}
                                placeholder={eInvoiceRegistrationRequiredData.field3}
                                placeholderTextColor="#6e749d"
                                value={param3}
                                onChangeText={(value) => {
                                    setParam3(value);
                                }
                                }
                            />)}

                            {eInvoiceRegistrationRequiredData.field4!=null && (
                            <TextInput
                                style={styles.input}
                                placeholder={eInvoiceRegistrationRequiredData.field4}
                                placeholderTextColor="#6e749d"
                                value={param4}
                                onChangeText={(value) => {
                                    setParam4(value)
                                }}
                            />)}


                        </View>
                    </View>
                    <Pressable style={styles.submitButton} onPress={checkAndSubmitRegistration}>
                        <Text style={styles.text}>Submit</Text>
                    </Pressable>
                
                    

                </View>
            </ScrollView>
        </>
    );

};

const styles = StyleSheet.create({
    categoryPicker: {
        backgroundColor: "#6e749d",
        marginLeft: 6,
        marginTop: 5,
        width: "91%",
    },
    container: {
        alignItems: "center",
        backgroundColor: "#1B1938",
        paddingTop: '5%',
        paddingBottom: '100%'
    },
    elipseContainer: {
        backgroundColor: "#312e66",
        borderColor: "black",
        borderRadius: 50,
        margin: 3,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingVertical: 'auto',
        height: '90%',
        width: '90%'
    },
    inputFieldsContainer: {
        paddingTop: '10%',
    },
    input: {
        alignItems: "stretch",
        backgroundColor: "#23204d",
        borderRadius: 10,
        color: "white",
        height: 50,
        margin: 4,
        padding: 9,
        width: "92%",
    },
    scroll: {
        flexGrow: 2,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: 'white',

    },
   
    submitButton: {
        alignItems: "center",
        backgroundColor: "#FFC021",
        borderRadius: 30,
        justifyContent: "center",
        margin: 10,
        padding: "5%",
        width: "50%",
    },
    text: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 0.25,
        lineHeight: 21,
    }
}
);

export default EInvoiceRegistrationScreen;
