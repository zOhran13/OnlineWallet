import { AppState } from "react-native";

export const getTemplates = () => {
  const fetchedData = fetch('https://7e14-92-36-163-26.eu.ngrok.io/api/Template')
    .then(result => result.json())
    .then(data => {
        return data;
    })
    
    return fetchedData;
}

export async function getTemplate(id) {
 // console.log("Evo mene id",id)
  const fetchedData = fetch("https://7e14-92-36-163-26.eu.ngrok.io/api/Template/"+id)
  .then(result => result.json())
  .then(data => {//console.log("Evo mene evo mene ovdje saaaam",data)
          return data;
  })

  return fetchedData;
  }

  export async function update(id,userId,title, recipientName, recipientAccountNumber, description, currency) {
  fetch("https://7e14-92-36-163-26.eu.ngrok.io/api/Template/"+id, {
  method: 'PUT',
  body: JSON.stringify({
    userId: userId,
    title: title,
    description: description,
    currency: currency,
    recipientName: recipientName,
    recipientAccountNumber: recipientAccountNumber
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
}

export async function deleteTemplate(id) {
  try {
    let response = await fetch("https://4494-195-130-59-86.eu.ngrok.io/api/Template/"+id, {
      method: 'DELETE',
    });
    let json = await response.text();
    console.log("Heeej: ", json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function createTemplate(userId, title, recipientName, recipientAccountNumber, description, currency) {
  fetch("https://7e14-92-36-163-26.eu.ngrok.io/api/Template", {
  method: 'POST',
  body: JSON.stringify({
    userId: userId,
    title: title,
    description: description,
    currency: currency,
    recipientName: recipientName,
    recipientAccountNumber: recipientAccountNumber
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
}
