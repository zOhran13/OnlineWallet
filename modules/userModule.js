export async function getUsers() {
  try {
    let response = await fetch("url sa bekenda/users");
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
