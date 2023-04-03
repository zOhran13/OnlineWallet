import { AppState } from "react-native";

export const getTemplates = () => {
  const fetchedData = fetch('https://4494-195-130-59-86.eu.ngrok.io/api/Template')
    .then(result => result.json())
    .then(data => {
        return data;
    })

    return fetchedData;
}

export async function getTemplate(id) {
  try {
    let response = await fetch(`https://4494-195-130-59-86.eu.ngrok.io/api/Template/${id}`);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function update(id) {
  fetch(`https://4494-195-130-59-86.eu.ngrok.io/api/Template/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({
    
    title: 'foo',

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