const schemaValidator = require('../../database/schema/schemaValidator');
const UUID = require('../../utils/uuid/UUID');

class User {
  constructor(data) {
    Object.assign(this, User.trimObject(data));
  }

  static toResponse(user) {
    const { password, ...publicUser } = user;
    return publicUser;
  }

  static trimObject(data) {
    const trimmed = {};
    Object.keys(User.schema).forEach((prop) => {
      if (prop in data) {
        trimmed[prop] = data[prop];
      }
    });
    return trimmed;
  }

  validate() {
    schemaValidator(User, this);
  }
}

User.schema = {
  id: {
    type: UUID,
  },
  name: {
    type: String,
    minlen: 1,
    required: true,
  },
  login: {
    type: String,
    minlen: 1,
    required: true,
  },
  password: {
    type: String,
    minlen: 1,
    required: true,
  },
};

module.exports = User;
