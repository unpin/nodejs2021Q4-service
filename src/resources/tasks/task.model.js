const schemaValidator = require('../../database/schema/schemaValidator');
const UUID = require('../../utils/uuid/UUID');

class Task {
  constructor(data) {
    Object.assign(this, Task.trimObject(data));
  }

  static trimObject(data) {
    const trimmed = {};
    Object.keys(Task.schema).forEach((prop) => {
      if (prop in data) {
        trimmed[prop] = data[prop];
      }
    });
    return trimmed;
  }

  validate() {
    schemaValidator(Task, this);
  }
}

Task.schema = {
  id: { type: String },
  title: { type: String, required: true, minlen: 1 },
  order: { type: Number, required: true },
  description: { type: String, required: true },
  userId: { required: true },
  boardId: { type: UUID, required: true },
  columnId: { required: false },
};

module.exports = Task;
