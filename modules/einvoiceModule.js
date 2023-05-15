import * as SecureStore from 'expo-secure-store';

var link = 'http://siprojekat.duckdns.org:5051';

async function getToken() {
    const token = await SecureStore.getItemAsync("secure_token");
    
    return token;
}

export const getEInvoiceRequiredData = async (b2BName) => {
    try {
        const token = await getToken();
        console
        const fetchedData = await fetch(link + '/api/InvoiceRegistration/required-data/' + b2BName, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const data = await fetchedData.json();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export async function registerNewEInvoice(b2BName, field1, field2, field3, field4) {

    const token = await getToken();
    fetch(link + '/api/InvoiceRegistration/registration-request', {
        method: 'POST',
        body: JSON.stringify({
            b2BName: b2BName,
            field1: field1,
            field2: field2,
            field3: field3,
            field4: field4
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}`

        },
    })
        .then((response) => response.json());
}