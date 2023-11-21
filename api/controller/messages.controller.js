const messageService = require('../service/messages.service');
const logger = require('../logger/logger');

class MessageController {
  async getMessages() {
    logger.info('Controller: getMessages');
    return await messageService.getMessages();
  }

  async getMessagesConversation(conversationId) {
    logger.info('Controller: getMessagesConversation');
    return await messageService.getMessagesConversation(conversationId);
  }

  async createMessage(message) {
    logger.info('Controller: createMessage', message);
    return await messageService.createMessage(message);
  }

  async updateMessage(message) {
    logger.info('Controller: updateMessage', message);
    return await messageService.updateMessage(message);
  }

  async deleteMessage(messageId) {
    logger.info('Controller: deleteMessage', messageId);
    return await messageService.deleteMessage(messageId);
  }

  async deleteConversation(conversationId) {
    logger.info('Controller: deleteConversation', conversationId);
    return await messageService.deleteConversation(conversationId);
  }

}

module.exports = new MessageController();