const userService = require('../service/user.service');
const logger = require('../logger/logger');

class UserController {
  async getUsers() {
    logger.info('Controller: getUsers');
    return await userService.getUsers();
  }

  async createUser(req) {
    logger.info('Controller: createUser', req);
    return await userService.createUser(req);
  }

  async loginUser(req) {
    logger.info('Controller: Login user', req);
    return await userService.loginUser(req);
  }

  async updateUser(user) {
    logger.info('Controller: updateUser', user);
    return await userService.updateUser(user);
  }

  async getUser(userId) {
    logger.info('Controller: getUser', userId);
    return await userService.getUser(userId);
  }

  async deleteUser(userId) {
    logger.info('Controller: deleteUser', userId);
    return await userService.deleteUser(userId);
  }

  async findUserByUsername(username) {
    logger.info('Controller: findUserByUsername', username);
    return await userService.findUserByUsername(username);
  }

}

module.exports = new UserController();