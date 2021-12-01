module.exports = class SchemaValidationError extends Error {
  constructor(prop, validator) {
    super(`${prop} is not valid => [${validator}]`);
  }
};
