const UUID = require('../../utils/uuid/UUID.js');
const SchemaValidationError = require('../error/SchemaValidationError.js');

/** Type Validators */

function isNumber(num) {
  return Number.isFinite(num);
}

function isString(s) {
  return typeof s === 'string';
}

function isArray(obj) {
  return Array.isArray(obj);
}

function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

function isDate(obj) {
  return obj instanceof Date;
}

function isBoolean(obj) {
  return typeof obj === 'boolean';
}

/** String validators */

function minlen(num) {
  return function minlenValidator(string) {
    return string.length >= num;
  };
}

function maxlen(num) {
  return function maxlenValidator(string) {
    return string.length <= num;
  };
}

/** Number validators */

function min(num) {
  return function minValidator(n) {
    return n >= num;
  };
}

function max(num) {
  return function maxValidator(n) {
    return n <= num;
  };
}

function getTypeValidator(type) {
  if (type instanceof Array) {
    const ofType = type[0];
    return (array) => {
      if (ofType) {
        return array.every(getTypeValidator(ofType));
      }
      return isArray(array);
    };
  }

  switch (type) {
    case String:
      return isString;
    case Number:
      return isNumber;
    case Array:
      return isArray;
    case Date:
      return isDate;
    case Boolean:
      return isBoolean;
    case Object:
      return isObject;
    case UUID:
      return (ID) => UUID.isValid(ID);
    default:
      throw new Error(`Validator ${type} is not supported.`);
  }
}

function getValidator(key, value) {
  switch (key) {
    case 'required':
      return () => true;
    case 'type':
      return getTypeValidator(value);
    case 'minlen':
      return minlen(value);
    case 'maxlen':
      return maxlen(value);
    case 'min':
      return min(value);
    case 'max':
      return max(value);
    default:
      throw new Error(`Validator for ${key} is not supported.`);
  }
}

function schemaValidator(model, data) {
  const { schema, name: className } = model;

  Object.entries(schema).forEach(([prop, validation]) => {
    if (validation.required) {
      if (!(prop in data)) {
        throw new SchemaValidationError(`${className}.${prop} is required.`);
      }
    }
    if (prop in data) {
      Object.entries(validation).forEach(([key, value]) => {
        const validate = getValidator(key, value);
        if (!validate(data[prop])) {
          throw new SchemaValidationError(`${prop} is not valid => [${value}]`);
        }
      });
    }
  });
}

module.exports = schemaValidator;
