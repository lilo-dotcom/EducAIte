const userRepository = require('../repository/user.repository');

class UserService {

  constructor() {}

  async getUsers() {
    return await userRepository.getUsers();
  }

  async createUser(req) {
    return await userRepository.createUser(req);
  }

  async loginUser(req) {
    return await userRepository.loginUser(req);
  }

  async updateUser(user) {
    return await userRepository.updateUser(user);
  }

  async getUser(userId) {
    return await userRepository.getUser(userId);
  }

  async deleteUser(userId) {
    return await userRepository.deleteUser(userId);
  }

  async findUserByUsername(username) {
    return await userRepository.findUserByUsername(username);
  }

}

module.exports = new UserService();