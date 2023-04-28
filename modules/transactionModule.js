import { getUsers, getUserDetails, getRecipientDetails } from "./userModule";

import * as SecureStore from 'expo-secure-store';
var link = 'https://processingserver.herokuapp.com'

async function getToken() {
    const token = await SecureStore.getItemAsync("secure_token");

    return token;
}


export async function submitTransaction(amount, paymentType, recipientName, recipientAccountNumber, description, phoneNumber,
    currency, category) {
    try {
        acc = 'ABC4'
        token = await getToken();
            await fetch(link + '/api/Transaction/CreateTransaction?token=' + token , {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(
                    {
                        amount: amount,
                        currency: currency,
                        transactionType: paymentType,
                        transactionPurpose: description,
                        category: category,
                        sender: {
                            accountNumber: acc
                        },
                        recipient: {
                            name: recipientName,
                            accountNumber: recipientAccountNumber
                        }
                        
                    }              ),
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

export async function getTransactions(page = "1", pageSize="10") {
    try {
      

        const token = await getToken();
        const fetchedData = await fetch(link + '/api/Transaction/GetTransactionsForUser?token=' + token + '&pageNumber=' + page + '&pageSize=' + pageSize)

        const data = await fetchedData.json();

        return data;


    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function getTransactionById(id) {
    try {
        page = "1";

        const token = await getToken();
        const fetchedData = await fetch(link + '/api/Transaction/GetTransactionById?token=' + token + '&transactionId=' + id)

        const data = await fetchedData.json();

        return data;


    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getAccounts() {
    try {

        const token = await getToken();
        const fetchedData = await fetch(link + '/api/Account/GetAllAccountsForUser?token=' + token)
       
        const data = await fetchedData.json();
        
        return data;
   
 
    } catch (error) { 
        console.error(error);
        throw error;
    }
}

