const messageRepository = require('../repository/messages.repository');

class MessageService {

  constructor() {}

  async getMessages() {
    return await messageRepository.getMessages();
  }

  async getMessagesConversation(conversationId) {
    return await messageRepository.getMessagesConversation(conversationId);
  }

  async createMessage(message) {
    return await messageRepository.createMessage(message);
  }

  async updateMessage(message) {
    return await messageRepository.updateMessage(message);
  }

  async deleteMessage(messageId) {
    return await messageRepository.deleteMessage(messageId);
  }

  async deleteConversation(conversationId) {
    return await messageRepository.deleteConversation(conversationId);
  }

  async findMessageByEmail(email) {
    return await messageRepository.findMessageByEmail(email);
  }

}

module.exports = new MessageService();