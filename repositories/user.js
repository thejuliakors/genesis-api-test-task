const userDBService = require('../services/db/user')

userDBService.initialize()

class UserRepository {
  static createUser (userData, callback) {
    userDBService.create(userData, callback)
  }

  static findUser (userEmail, callback) {
    userDBService.findOne(userEmail, callback)
  }
}

module.exports = UserRepository
