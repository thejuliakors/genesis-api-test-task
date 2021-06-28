const fs = require("fs");
const constants = require('../constants');
const _ = require("underscore");

fs.exists(constants.USERS_JSON_PATH, (exists) => {
  if (!exists) {
    fs.writeFile(constants.USERS_JSON_PATH, '{"users": []}', (err, data) => {
      if (err){
        console.log(err);
      }
    });
  }
});

class UserRepository{

  static createUser(userData, callback) {
    fs.readFile(constants.USERS_JSON_PATH, "utf8", (err, usersJSON) => {
      if (err){
          return callback(err, usersJSON);
      } else {
        let users = JSON.parse(usersJSON);
        users.users.push(userData);
        fs.writeFile(constants.USERS_JSON_PATH, JSON.stringify(users), "utf8", callback);
      }
    });
  }

  static findUser(userEmail, callback) {
    fs.readFile(constants.USERS_JSON_PATH, (err, data) => {
      let users = JSON.parse(data);
      let usersWithEmail = _.where(users.users, {email: userEmail});

      if (usersWithEmail.length === 0) {
        callback(err, null);
      } else {
        callback(err, usersWithEmail[0]);
      }
    });
  }

}

module.exports = UserRepository;
