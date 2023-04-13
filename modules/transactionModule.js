import { getUsers, getUserDetails, getRecipientDetails } from "./userModule";

import * as SecureStore from 'expo-secure-store';
var link = 'https://processingserver.herokuapp.com'

async function getToken() {
    const token = await SecureStore.getItemAsync("secure_token");

    return token;
}

export async function submitTransaction(amount, currency, paymentType, recipientName, recipientAccountNumber, description, category) {
    try {

        token = await getToken();
            data = await getRecipientDetails(recipientName); 
            await fetch(link + '/Transaction/CreateTransaction?token=' + token , {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(
                    {
                        amount: amount,
                        currency: currency,
                        transaction_type: paymentType,
                        transaction_purpose: description,
                        category: category,
                        name: recipientName,
                        account_number: recipientAccountNumber,
                        bank_name: bankName,
                        type: recipientTypewa
                    }



              ),
            }).then((response) => {
                if (response.status == 200) {
                    alert("Transaction successful!");
                    return;
                } else {
                    alert("Transaction not successful!");
                    return;
                }
            });
        
    } catch (error) {
        console.error(error);
    }
}

export async function getTransactions() {
    try {

        const token = await getToken();
    const fetchedData = fetch(link + '/Transaction/GetTransactionsForUser/?token=' + token + '&pageNumber=1&pageSize=20')
            const data = await fetchedData.json();

        return data;
   
 
    } catch (error) {
        console.error(error);
    }
}

