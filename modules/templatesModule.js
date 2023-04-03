export async function getTemplates() {
    try {
      let response = await fetch("https://4494-195-130-59-86.eu.ngrok.io/api/Template");
      let json = await response.json();
      //console.log(JSON.parse(json));
      return json;
    } catch (error) {
      console.error(error);
    }
}