export async function getAllUsers() {
  const response = await fetch('/api/users');
  return await response.json();
}

export async function createUser(data) {
  const response = await fetch ('/api/user', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user: data})
  })
  return await response.json();
}

export async function editUser(data) {
  const response = await fetch('/api/user', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user: data})
  })
  return await response.json();
}

export async function deleteUser(userId) {
  const response = await fetch(`/api/user/id/${userId}`, {method: 'DELETE'})
  return await response.json();
}

export async function getUser(userId) {
  const response = await fetch(`/api/user/id/${userId}`, {method: 'GET'})
  return await response.json();
}

export async function findUserByUsername(username) {
  const response = await fetch(`/api/user/username/${username}`, {method: 'GET'})  
  const data = await response.json();
  const count = await data;
  return await count;
}