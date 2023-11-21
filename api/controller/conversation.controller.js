const conversationService = require('../service/conversation.service');
const logger = require('../logger/logger');

class ConversationController {

  async getConversations() {
    logger.info('Controller: getConversations');
    return await conversationService.getConversations();
  }

  async getConversationsUser(userId) {
    logger.info('Controller: getConversationsUser');
    return await conversationService.getConversationsUser(userId);
  }

  async getCurrentConversation(conversationId) {
    logger.info('Controller: getCurrentConversation');
    return await conversationService.getCurrentConversation(conversationId);
  }

  async createConversation(req) {
    logger.info('Controller: createConversation', req);
    return await conversationService.createConversation(req);
  }

  async updateConversation(conversation) {
    logger.info('Controller: updateConversation', conversation);
    return await conversationService.updateConversation(conversation);
  }

  async deleteConversation(conversationId) {
    logger.info('Controller: deleteConversation', conversationId);
    return await conversationService.deleteConversation(conversationId);
  }
}

module.exports = new ConversationController();