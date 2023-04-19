import * as SecureStore from 'expo-secure-store';

var link = 'http://siprojekat.duckdns.org:5051';



async function getToken() {
    const token = await SecureStore.getItemAsync("secure_token");

    return token;
}

export const getTemplates = async (userId) => {
    try {
        const token = await getToken();
        const fetchedData = await fetch(link + '/api/Template/User/' + userId, {
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


export async function getTemplate(id) {
    
    try {

        const token = await getToken();
        const fetchedData = await fetch(link + '/api/Template/' + id, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const data = await fetchedData.json();
     
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}


export async function createTemplate(userId, title, amount, paymentType, recipientName, recipientAccountNumber, description, phoneNumber, currency, category, received = "false") {

    const token = await getToken();
    fetch(link + '/api/Template', {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            title: title,
            amount: amount,
            paymentType: paymentType,
            recipientName: recipientName,
            recipientAccountNumber: recipientAccountNumber,
            description: description,
            phoneNumber: phoneNumber,
            currency: currency,
            category: category,
            received: received

        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}`

        },
    })
        .then((response) => response.json());
}

export async function updateTemplate(id, userId, title, amount, paymentType, recipientName, recipientAccountNumber, description, phoneNumber, currency, category, received = "false") {
    
    const token = await getToken();
    fetch(link + '/api/Template/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            userId: userId,
            title: title,
            amount: amount,
            paymentType: paymentType,
            recipientName: recipientName,
            recipientAccountNumber: recipientAccountNumber,
            description: description,
            phoneNumber: phoneNumber,
            currency: currency,
            category: category,
            received: received

        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}`
        },
    })
        .then((response) => response.json());
}

export async function deleteTemplate(id) {
    try {

        const token = await getToken();
        let response = await fetch(link + '/api/Template/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        let json = await response.text();
        return json;
    } catch (error) {
        console.error(error);
    }
}

