const { connect } = require('../config/db.config');
const logger = require('../logger/logger');

class MessageRepository {

  db = {};

  constructor() {
    this.db = connect();

    this.db.sequelize.sync({ force: false }).then(() => {
      console.log("Drop and re-sync db.");
    });
  }

  async getMessages() {

    try {
      const messages = await this.db.messages.findAll();
      console.log('messages:::', messages);
      return messages;
    } catch (err) {
      logger.error('Error::' + err);
      return [];
    }

  }

  async getMessagesConversation(conversationId) {
    try {
      const messages = await this.db.messages.findAll({
        where: {
          conversation: conversationId
        }
      });
      return await messages;
    } catch (err) {
      logger.error('Error::' + err);
      return [];
    }
  }

  async createMessage(message) {

    console.log(message);
    let data = {};
    try {
      data = await this.db.messages.create(message);
    } catch (err) {
      logger.error('Error::' + err);
    }
    return data;

  }

  async updateMessage(message) {

    let data = {};
    try {
      message.updateddate = new Date().toISOString();
      data = await this.db.messages.update({...message}, {
        where: {
          id: message.id
        }
      });
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;

  }

  async deleteMessage(messageId) {
    let data = {};
    try {
      data = await this.db.messages.destroy({
        where: {
          id: messageId
        }
      });
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }

  async deleteConversation(conversationId) {
    let data = {};
    try {
      data = await this.db.messages.destroy({
        where: {
          conversationId: conversationId
        }
      });
    } catch (err) {
      logger.error('Error::' + err);
    }
    return data;
  }

}

module.exports = new MessageRepository();