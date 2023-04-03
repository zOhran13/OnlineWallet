export async function getTemplates() {
    try {
      let response = await fetch("https://8df3-128-65-109-104.eu.ngrok.io/api/Template");
      let json = await response.text();
      //console.log(JSON.parse(json))
      return json;
    } catch (error) {
      console.error(error);
    }
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