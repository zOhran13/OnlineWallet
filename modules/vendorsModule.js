import * as SecureStore from 'expo-secure-store';

var link = 'http://siprojekat.duckdns.org:5051';

async function getToken() {
    const token = await SecureStore.getItemAsync("secure_token");
    
    return token;
}

export const getVendors = async () => {
    try {
        const token = await getToken();
        console
        const fetchedData = await fetch(link + '/api/Vendor/', {
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
