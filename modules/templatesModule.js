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
 // console.log("Evo mene id",id)

    const token = await getToken();
    const fetchedData = fetch(link + '/api/Template/' + id, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
  .then(result => result.json())
  .then(data => {//console.log("Evo mene evo mene ovdje saaaam",data)
          return data;
  })

  return fetchedData;
  }

export async function updateTemplate(id, userId, title, amount, paymentType, recipientName, recipientAccountNumber, description, currency) {

    const token = await getToken();
      fetch(link + '/api/Template/' + id, {
  method: 'PUT',
  body: JSON.stringify({
    userId: userId,
    title: title,
    amount: amount,
    paymentType: paymentType,
    description: description,
    currency: currency,
    recipientName: recipientName,
    recipientAccountNumber: recipientAccountNumber
  }),
  headers: {
      'Content-type': 'application/json; charset=UTF-8',
              'Authorization': `Bearer ${token}`
          },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
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
        console.log("Heeej: ", json);
        return json;
    } catch (error) {
        console.error(error);
    }
}


export async function createTemplate(userId, title, amount, paymentType, recipientName, recipientAccountNumber, description, currency) {

    const token = await getToken();
  fetch(link + '/api/Template', {
  method: 'POST',
      body: JSON.stringify({
          userId: userId,
          title: title,
          amount: amount,
          paymentType: paymentType,
          description: description,
          currency: currency,
          recipientName: recipientName,
          recipientAccountNumber: recipientAccountNumber
      }),
  headers: {
      'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
     
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
}
