export async function getConversationsUser(userId) {
  const response = await fetch(`/api/conversation/id/${userId}`, {method: 'GET'})
  return await response.json();
}

export async function getCurrentConversation(conversationId) {
  const response = await fetch (`/api/conversation/conversationid/${conversationId}`, {method: 'GET'})
  return await response.json();
}

export async function updateCurrentConversation(conversation) {
  const response = await fetch (`/api/conversation`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({conversation: conversation})
  })
  return await response.json();
}