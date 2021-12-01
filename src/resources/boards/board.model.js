const schemaValidator = require('../../database/schema/schemaValidator');
const UUID = require('../../utils/uuid/UUID');

class Board {
  constructor(data) {
    Object.assign(this, Board.trimObject(data));
  }

  static trimObject(data) {
    const trimmed = {};
    Object.keys(Board.schema).forEach((prop) => {
      if (prop in data) {
        trimmed[prop] = data[prop];
      }
    });
    return trimmed;
  }

  validate() {
    schemaValidator(Board, this);
  }
}

Board.schema = {
  id: {
    type: UUID,
  },
  title: {
    type: String,
    minlen: 1,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
};

module.exports = Board;
