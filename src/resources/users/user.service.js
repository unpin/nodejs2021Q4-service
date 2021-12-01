const { HTTP_STATUS } = require('../../common/constants');
const SchemaValidationError = require('../../database/error/SchemaValidationError');
const UUID = require('../../utils/uuid/UUID');
const userRepo = require('./user.memory.repository');
const User = require('./user.model');

const create = async ({ request, response }) => {
  try {
    const user = new User(request.body);
    user.validate();
    const saved = await userRepo.createOne(user);
    response.status = HTTP_STATUS.CREATED;
    response.body = User.toResponse(saved);
  } catch (error) {
    if (error instanceof SchemaValidationError) {
      response.body = { message: error.message };
      response.status = HTTP_STATUS.BAD_REQUEST;
    } else {
      console.error(error.message);
      response.status = HTTP_STATUS.INTERNAL_ERROR;
    }
  }
};

const getAll = async ({ response }) => {
  try {
    const users = await userRepo.getAll();
    response.body = users.map(User.toResponse);
    response.status = HTTP_STATUS.OK;
  } catch (error) {
    console.error(error.message);
    response.status = HTTP_STATUS.INTERNAL_ERROR;
  }
};

const getOne = async ({ request, response }) => {
  const { userID } = request.params;
  try {
    if (!UUID.isValid(userID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'User ID is not valid.' };
    } else {
      const user = await userRepo.getByID(userID);
      if (user) {
        response.status = HTTP_STATUS.OK;
        response.body = User.toResponse(user);
      } else {
        response.status = HTTP_STATUS.NOT_FOUND;
        response.body = { message: 'User with this ID has not been found.' };
      }
    }
  } catch (error) {
    console.error(error.message);
    response.status = HTTP_STATUS.INTERNAL_ERROR;
  }
};

const updateOne = async ({ request, response }) => {
  const { userID } = request.params;
  try {
    if (!UUID.isValid(userID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'User ID is not valid.' };
    } else {
      const user = await userRepo.getByID(userID);
      if (user) {
        const updated = await userRepo.updateOne({ id: userID }, request.body);
        response.status = HTTP_STATUS.OK;
        response.body = User.toResponse(updated);
      } else {
        response.status = HTTP_STATUS.NOT_FOUND;
        response.body = { message: 'User with this ID has not been found.' };
      }
    }
  } catch (error) {
    console.error(error.message);
    response.status = HTTP_STATUS.INTERNAL_ERROR;
  }
};

const deleteOne = async ({ request, response }) => {
  const { userID } = request.params;
  try {
    if (!UUID.isValid(userID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'User ID is not valid.' };
    } else {
      const user = await userRepo.deleteOne({ id: userID });
      if (user) {
        await userRepo.deleteOne({ id: userID });
        response.status = HTTP_STATUS.NO_CONTENT;
      } else {
        response.status = HTTP_STATUS.NOT_FOUND;
        response.body = { message: 'User with this ID has not been found.' };
      }
    }
  } catch (error) {
    console.error(error.message);
    response.status = HTTP_STATUS.INTERNAL_ERROR;
  }
};

module.exports = { create, getAll, getOne, updateOne, deleteOne };
