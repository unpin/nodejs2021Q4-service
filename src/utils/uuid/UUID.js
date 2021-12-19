const crypto = require('crypto');

const V4_REGEX = /^([0-9a-fA-F]){8}(-[0-9a-fA-F]{4}){3}-([0-9a-fA-F]){12}$/;

module.exports = class UUID {
  static isValid(uuidString) {
    return V4_REGEX.test(uuidString);
  }

  static generateUUID(options) {
    return crypto.randomUUID(options);
  }
};
