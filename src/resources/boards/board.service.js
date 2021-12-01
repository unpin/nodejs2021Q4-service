const { HTTP_STATUS } = require('../../common/constants');
const SchemaValidationError = require('../../database/error/SchemaValidationError');
const UUID = require('../../utils/uuid/UUID');
const taskRepo = require('../tasks/task.memory.repository');
const boardRepo = require('./board.memory.repository');
const Board = require('./board.model');

const create = async ({ request, response }) => {
  try {
    const board = new Board(request.body);
    board.validate();
    const saved = await boardRepo.createOne(board);
    response.status = HTTP_STATUS.CREATED;
    response.body = saved;
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
    const boards = await boardRepo.getAll();
    response.body = boards;
    response.status = HTTP_STATUS.OK;
  } catch (error) {
    console.error(error.message);
    response.status = HTTP_STATUS.INTERNAL_ERROR;
  }
};

const getOne = async ({ request, response }) => {
  const { boardID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'Board ID is not valid.' };
    } else {
      const board = await boardRepo.getByID(boardID);
      if (board) {
        response.status = HTTP_STATUS.OK;
        response.body = board;
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
  const { boardID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'Board ID is not valid.' };
    } else {
      const board = await boardRepo.getByID(boardID);
      if (board) {
        response.body = await boardRepo.updateOne(
          { id: boardID },
          request.body
        );
        response.status = HTTP_STATUS.OK;
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
  const { boardID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status = HTTP_STATUS.BAD_REQUEST;
      response.body = { message: 'Board ID is not valid.' };
    } else {
      const board = await boardRepo.deleteOne({ id: boardID });
      if (board) {
        await boardRepo.deleteOne({ id: boardID });
        await taskRepo.deleteMany({ boardId: boardID });
        response.status = HTTP_STATUS.NO_CONTENT;
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
