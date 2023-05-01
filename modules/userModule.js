
import * as SecureStore from 'expo-secure-store';

var link = 'http://siprojekat.duckdns.org:5051';

async function getToken() {
    const token = await SecureStore.getItemAsync("secure_token");
    
    return token;
}

export const getUserName = async () => {
    try {
        const token = await getToken();
        const fetchedData = await fetch(link + '/api/User/', {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        
        const data = await fetchedData.json();
     
        return data.userName;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUserDetails = async () => {
    try {
        const token = await getToken();
        const userName = await getUserName();
        const fetchedData = await fetch(link + '/api/User/' + userName, {
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

export const getRecipientDetails = async (userName) => {
    try {
        const token = await getToken();
        const fetchedData = await fetch(link + '/api/User/' + userName, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const data = await fetchedData.json();
        return data;
    } catch (error) {
        console.log("ovjde 2"+error);
        throw error;
    }
};

export async function getUsers() {

    const token = await getToken();
    let fetchedData = await fetch('/api/User/', {
        authorization: `Bearer ${token}`
    }).then(result => result.json())
        .then(data => {
            return data;
        })

    return fetchedData;

}

export async function getUser(id) {
    try {
        let response = await fetch(`url sa bekenda/users/${id}`);
        let json = await response.json();
        return json.user;
    } catch (error) {
        console.error(error);
    }
}
