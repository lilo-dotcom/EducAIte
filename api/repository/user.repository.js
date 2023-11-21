const { connect } = require('../config/db.config');
const logger = require('../logger/logger');
const bcrypt = require("bcrypt");
const { jwtSign } = require('../controller/jwt.controller');

class UserRepository {

  db = {};

  constructor() {
    this.db = connect();

    this.db.sequelize.sync({ force: false }).then(() => {
      console.log("Drop and re-sync db.");
    });
  }

  async getUsers() {

    try {
      const users = await this.db.users.findAll();
      console.log('users:::', users);
      return users;
    } catch (err) {
      logger.error('Error::' + err);
      return [];
    }

  }

  async createUser(req) {

    let response = {};

    try {
      console.log(req.body);
      const existingUser = await this.db.users.findOne({
        where: {
        email: req.body.username,
        }
      });

      if (existingUser) {
        response = ({ loggedIn: false, status: "This username is already associated with an account."});
        return response;
      }
      
      if (req.body.username.length < 2) {
        response = ({ loggedIn: false, status: "Username should be at least 2 characters long."});
        return response;
      }

      if (
        !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(req.body.password)
      ){
        response = ({ loggedIn: false, status: "Password should contain at-least 8 characters and consist of uppercase, lowercase, and numeric characters."});
        return response;
      }

      if (req.body.name.length < 2) {
        response = ({ loggedIn: false, status: "Name should be at least 2 characters long."});
        return response;
      }

      const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = {
            name: req.body.name,
            email: req.body.username,
            password: hashedPass,
        };
        const newUser = await this.db.users.create(user);

        response = ({ loggedIn: true, email: req.body.username, id: newUser.id });

    } catch (err) {
      logger.error('Error::' + err);
    }

    return response;
    
  }

  async loginUser(req) {
    let data = {};
    let response = {};
    try {
      data = await this.db.users.findOne({
        where: {
          email: req.body.username
        }
      });
      if (data) {
        const isSame = await bcrypt.compare(req.body.password, data.password);
        console.log(isSame);
        console.log(data.password);
        if (isSame) {
          await jwtSign({ id: data.id }, process.env.SECRETKEY, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          }).then(token => {
            response = { loggedIn: true, token, id: data.id };
          })
          .catch(err => {
            console.log(err);
            response = { loggedIn: false, status: "Try again later."};
          });
        } else {
          response = { loggedIn: false, status: "Wrong username or password."};
          console.log("Wrong password.");
        }
      } else {
        console.log("No account found.");
        response = { loggedIn: false, status: "Wrong username or password."};
      } 
    } catch (err) {
      console.log("ERRORHERE");
      logger.error('Error::' + err);
    }
    console.log(response);
    return response;
  }

  async updateUser(user) {

    let data = {};
    try {
      data = await this.db.users.update({...user}, {
        where: {
          id: user.id
        }
      });
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;

  }

  async getUser(userId) {
    let data = {};
    try {
      data = await this.db.users.findOne({
        where: {
          id: userId
        }
      });
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }

  async deleteUser(userId) {
    let data = {};
    try {
      data = await this.db.users.destroy({
        where: {
          id: userId
        }
      });
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }

  async findUserByUsername(username) {
    let data = {};
    try {
      data = await this.db.users.count({
        where: {
          email: username
        }
      });
    } catch(err) {
      logger.error('Error::' + err);
    }
    console.log(data);
    return data;
  }

}

module.exports = new UserRepository();