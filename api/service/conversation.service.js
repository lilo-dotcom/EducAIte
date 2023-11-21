const conversationRepository = require('../repository/conversation.repository');

class ConversationService {
  constructor() {}

  async getConversations() {
    return await conversationRepository.getConversations();
  }

  async getConversationsUser(userId) {
    return await conversationRepository.getConversationsUser(userId);
  }

  async getCurrentConversation(conversationId) {
    return await conversationRepository.getCurrentConversation(conversationId);
  }

  async createConversation(req) {
    return await conversationRepository.createConversation(req);
  }

  async updateConversation(conversation) {
    return await conversationRepository.updateConversation(conversation);
  }

  async deleteConversation(conversationId) {
    return await conversationRepository.deleteConversation(conversationId);
  }
}

module.exports = new ConversationService();