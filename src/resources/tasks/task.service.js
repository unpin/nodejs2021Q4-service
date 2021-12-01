const { HTTP_STATUS } = require('../../common/constants');
const SchemaValidationError = require('../../database/error/SchemaValidationError');
const UUID = require('../../utils/uuid/UUID');
const taskRepo = require('./task.memory.repository');
const boardRepo = require('../boards/board.memory.repository');
const Task = require('./task.model');

const create = async ({ request, response }) => {
  const { boardID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'Board ID is not valid.' };
    } else {
      const task = new Task(request.body);
      task.boardId = boardID;
      task.validate();
      const saved = await taskRepo.createOne(task);
      response.status = HTTP_STATUS.CREATED;
      response.body = saved;
    }
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
    response.body = await taskRepo.getAll();
    response.status = HTTP_STATUS.OK;
  } catch (error) {
    console.error(error.message);
    response.status = HTTP_STATUS.INTERNAL_ERROR;
  }
};

const getOne = async ({ request, response }) => {
  const { boardID, taskID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'Board ID is not valid.' };
    } else if (!UUID.isValid(taskID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'Task ID is not valid.' };
    } else {
      const board = await boardRepo.getByID(boardID);
      if (board) {
        const task = await taskRepo.getByID(taskID);

        if (task) {
          response.status = HTTP_STATUS.OK;
          response.body = task;
        } else {
          response.status = HTTP_STATUS.NOT_FOUND;
          response.body = { message: 'Task with this ID has not been found.' };
        }
      } else {
        response.status = HTTP_STATUS.NOT_FOUND;
        response.body = { message: 'Board with this ID has not been found.' };
      }
    }
  } catch (error) {
    console.error(error.message);
    response.status = HTTP_STATUS.INTERNAL_ERROR;
  }
};

const updateOne = async ({ request, response }) => {
  const { boardID, taskID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'Board ID is not valid.' };
    } else if (!UUID.isValid(taskID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'Task ID is not valid.' };
    } else {
      const board = await boardRepo.getByID(boardID);
      if (board) {
        const task = await taskRepo.updateOne({ id: taskID }, request.body);

        if (task) {
          response.status = HTTP_STATUS.OK;
          response.body = task;
        } else {
          response.status = HTTP_STATUS.NOT_FOUND;
          response.body = { message: 'Task with this ID has not been found.' };
        }
      } else {
        response.status = HTTP_STATUS.NOT_FOUND;
        response.body = { message: 'Board with this ID has not been found.' };
      }
    }
  } catch (error) {
    console.error(error.message);
    response.status = HTTP_STATUS.INTERNAL_ERROR;
  }
};

const deleteOne = async ({ request, response }) => {
  const { boardID, taskID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'Board ID is not valid.' };
    } else if (!UUID.isValid(taskID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'Task ID is not valid.' };
    } else {
      const board = await boardRepo.getByID(boardID);
      if (board) {
        const task = await taskRepo.deleteOne({ id: taskID });

        if (task) {
          response.status = HTTP_STATUS.NO_CONTENT;
        } else {
          response.status = HTTP_STATUS.NOT_FOUND;
          response.body = { message: 'Task with this ID has not been found.' };
        }
      } else {
        response.status = HTTP_STATUS.NOT_FOUND;
        response.body = { message: 'Board with this ID has not been found.' };
      }
    }
  } catch (error) {
    console.error(error.message);
    response.status = HTTP_STATUS.INTERNAL_ERROR;
  }
};

module.exports = { create, getAll, getOne, updateOne, deleteOne };
