require('dotenv').config()
var express = require("express"),
  bodyParser = require("body-parser"),
  logger = require('./logger/logger'),
  app = express(),
  port = process.env.PORT || 3000;

const conversationController = require('./controller/conversation.controller');
const messagesController = require('./controller/messages.controller');
const userController = require('./controller/user.controller')
const verificationController = require('./controller/verification.controller');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/login', (req, res) => {
  userController.loginUser(req, res).then(response => res.json(response));
});

app.get('/api/users', (req, res) => {
  userController.getUsers().then(data => res.json(data));
});

app.get('/api/conversations', (req, res) => {
  conversationController.getConversations().then(data => res.json(data));
})

app.get('/api/messages', (req, res) => {
  messagesController.getMessages().then(data => res.json(data));
})

app.get('/api/google/query/:q', (req, res) => {
  verificationController.searchGoogleScholar(req.params.q).then(data => res.json(data));
})

app.get('/api/google/cite/:c', (req, res) => {
  verificationController.citeGoogleScholar(req.params.c).then(data => res.json(data));
})

app.get('/api/htmlcontent/:u', (req, res) => {
  verificationController.getHTMLContent(req.params.u).then(data => res.json(data));
})

app.post('/api/user', (req, res) => {
  userController.createUser(req).then(response => res.json(response));
});

app.post('/api/conversation', (req, res) => {
  console.log(req);
  conversationController.createConversation(req).then(data => res.json(data));
})

app.post('/api/message', (req, res) => {
  messagesController.createMessage(req.body.message).then(data => res.json(data));
})

app.put('/api/user', (req, res) => {
  console.log(req);
  userController.updateUser(req.body).then(data => res.json(data));
});

app.put('/api/conversation', (req, res) => {
  conversationController.updateConversation(req.body.conversation).then(data => res.json(data));
})

app.put('/api/message', (req, res) => {
  messagesController.updateMessage(req.body.message).then(data => res.json(data));
})

app.get('/api/user/email/:userEmail', (req, res) => {
  userController.findUserByEmail(req.params.userEmail).then(data => {
    res.json(data);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

app.get('/api/conversation/id/:userId', (req, res) => {
  conversationController.getConversationsUser(req.params.userId).then(data => res.json(data));
})

app.get('/api/conversation/conversationid/:conversationId', (req, res) => {
  conversationController.getCurrentConversation(req.params.conversationId).then(data => res.json(data));
})

app.get('/api/message/id/:conversationId', (req, res) => {
  messagesController.getMessagesConversation(req.params.conversationId).then(data => res.json(data));
})

app.get('/api/user/id/:userId', (req, res) => {
  userController.getUser(req.params.userId).then(data => res.json(data));
});

app.delete('/api/user/id/:userId', (req, res) => {
  userController.deleteUser(req.params.userId).then(data => res.json(data));
});

app.delete('/api/conversation/id/:conversationId', (req, res) => {
  conversationController.deleteConversation(req.params.conversationId).then(data => res.json(data));
})

app.delete('/api/message/id/:messageId', (req, res) => {
  messagesController.deleteMessage(req.params.messageId).then(data => res.json(data));
})

app.get("/", function(req, res) {
  res.send("<h1>API is working.</h1>");
})

app.get("*", function(req, res) {
  logger.info("Undefined route");
  res.send("This route is undefined.");
})

app.listen(port, function(err) {
  console.log("Server is listening on port " + port);
  console.log(err);
});