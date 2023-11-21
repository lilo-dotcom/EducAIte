
const { Sequelize, Model, DataTypes } = require("sequelize");
const logger = require('../logger/logger');

const connect = () => {

  const hostName = process.env.HOST;
  const userName = process.env.USER;
  const password = process.env.PASSWORD;
  const database = process.env.DB;
  const dialect = process.env.DIALECT;
  const port = process.env.DB_PORT;

  logger.info("\nConnecting to DB...");
  const sequelize = new Sequelize(database, userName, password, {
    host: hostName,
    dialect: dialect,
    port: port,
    operatorsAliases: 0,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000
    }
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.users = require("../models/user.model")(sequelize, DataTypes, Model);
  db.conversations = require("../models/conversation.model")(sequelize, DataTypes, Model);
  db.messages = require("../models/messages.model")(sequelize, DataTypes, Model);

  return db;

}

module.exports = {
  connect
}