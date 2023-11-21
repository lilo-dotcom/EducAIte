const { connect } = require('../config/db.config');
const logger = require('../logger/logger');
const createMessage = require('./messages.repository');

class ConversationRepository {

  db = {};

  constructor() {
    this.db = connect();
    
    this.db.sequelize.sync({ force: false }).then(() => {
      console.log("Drop and re-sync db.");
    });
  }

  async getConversations() {
    try {
      const conversations = await this.db.conversations.findAll();
      console.log('conversations:::', conversations);
      return conversations;
    } catch (err) {
      logger.error('Error::' + err);
      return [];
    }
  }

  async getCurrentConversation(conversationId) {
    try {
      const conversation = await this.db.conversations.findAll({
        where: {
          id: conversationId
        }
      });
      return await conversation;
      
    } catch (err) {
      logger.error('Error::' + err);
      return [];
    }
  }

  async getConversationsUser(userId) {
    try {
      const conversations = await this.db.conversations.findAll({
        where: {
          user: userId
        }
      });
      return await conversations;
      
    } catch (err) {
      logger.error('Error::' + err);
      return [];
    }
  }

  async createConversation(req) {

    let response = {};
    try {

      if (req.body.name.length < 2) {
        response = ({ success: false, status: "Title should be at least 2 characters long."});
        return response;
      }

      // check user exists too
      const userExists = await this.db.users.findAll({
        where: {
          id: req.body.user,
        },
      });

      console.log(userExists);
      if (!userExists) {
        response = ({ success: false });
        return response;
      }

      const conversation = {
        name: req.body.name,
        context: req.body.context,
        user: req.body.user,
      }

      const newConvo = await this.db.conversations.create(conversation);

      response = ({ success: true, id: newConvo.id});

      if (req.body.context !== "") {
        let input = "Hello! The user having this conversation with you has specified the following context: ";
        input += req.body.context;
        input += ". Please keep this in mind throughout the conversation.";
        input += "Additionally, this user has specified that they have the following conditions/disabilities, please cater the conversation accordingly: ";
        input += userExists.user.condition;

        // set first message in convo
        createMessage({
          sender: -1,
          recipient: -2,
          text: input,
          conversation: newConvo.id,
        });

      }

    } catch (err) {
      logger.error('Error::' + err);
    }
    return response;

  }

  async updateConversation(conversation) {
    let data = {};
    console.log("UPDATE CONVO CONVERSATION", conversation);
    try {
      data = await this.db.conversations.update({...conversation}, {
        where: {
          id: conversation.id
        }
      });
    } catch (err) {
      logger.error('Error::' + err);
    }
    return data;
  }

  async deleteConversation(conversationId) {
    let data = {};
    try {
      data = await this.db.conversations.destroy({
        where: {
          id: conversationId
        }
      });
    } catch (err) {
      logger.error('Error::' + err);
    }
    return data;
  }

}

module.exports = new ConversationRepository();