export async function getAllMessages() {
  const response = await fetch('/api/messages');
  return await response.json();
}

export async function createMessage(data) {
  const response = await fetch ('/api/message', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: data})
  })
  console.log(response);
  return await response.json();
}

export async function editMessage(data) {
  const response = await fetch('/api/message', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: data})
  })
  return await response.json();
}

export async function deleteMessage(messageId) {
  const response = await fetch(`/api/message/id/${messageId}`, {method: 'DELETE'})
  return await response.json();
}

export async function getMessagesConversation(conversationId) {
  const response = await fetch(`/api/message/id/${conversationId}`, {method: 'GET'})
  return await response.json();
}