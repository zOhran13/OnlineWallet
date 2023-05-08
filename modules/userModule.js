
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


export async function redeemVoucher(voucher,accountNumber) {
    try {
        token = await getToken();
        
        await fetch(link + '/api/VoucherRedemption/RedeemVoucher/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },

            body: JSON.stringify(
                {
                    code: voucher,
                    accountNumber: accountNumber

                }),
        }).then((response) => {
            if (response.status == 200) {
                alert("Voucher Redeemed!");
                return;
            } else {
                alert("Invalid Voucher!");
                return;
            }
        });

    } catch (error) {
        console.error(error);
    }
}
