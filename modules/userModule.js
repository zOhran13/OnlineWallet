export async function getTemplates() {
  try {
    let response = await fetch("https://be19-5-43-126-189.eu.ngrok.io/swagger/index.html/api/Template");
    let json = await response.json();
    return json.users;
  } catch (error) {
    console.error(error);
  }
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
