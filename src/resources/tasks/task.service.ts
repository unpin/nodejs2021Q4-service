import { Request, Response } from 'express';
import HTTP_STATUS from '../../common/constants';
import UUID from '../../utils/uuid/UUID';
import * as taskRepo from './task.memory.repository';
import * as boardRepo from '../boards/board.memory.repository';
import Task from './task.model';
import { httpErrorHandler } from '../httpErrorHandler';

/**
 * Handler for request POST /boards/:boardID/tasks creates a new Task in the database.
 * Sends a response with one of the following content/status code:
 * - 200 and a Task object if the task has been created successfully.
 * - 400 if the request body is not valid.
 * - 500 if an error has occurred
 *
 * @param request - express {@link Request} object
 * @param response - express {@link Response} object
 * @returns Returns {@link Promise}\<void\>
 *
 */

export async function create(
  request: Request,
  response: Response
): Promise<void> {
  const { boardID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.json({ message: 'Board ID is not valid.' });
    } else {
      const task = new Task(request.body);
      task.boardId = boardID;
      task.validate();
      const saved = await taskRepo.createOne(task);
      response.status(HTTP_STATUS.CREATED);
      response.json(saved);
    }
  } catch (error) {
    httpErrorHandler(request, response, error);
  }
}

/**
 * Handler for request GET /boards/:boardID/tasks gets all tasks
 * Sends a response with one of the following content/status code:
 * - 200 and an array of Task objects
 * - 500 if an error has occurred
 *
 * @param request - express {@link Request} object
 * @param response - express {@link Response} object
 * @returns Returns {@link Promise}\<void\>
 *
 */

export async function getAll(
  request: Request,
  response: Response
): Promise<void> {
  try {
    response.status(HTTP_STATUS.OK);
    response.json(await taskRepo.getAll());
  } catch (error) {
    httpErrorHandler(request, response, error);
  }
}

/**
 * Handler for request GET /boards/:boardID/tasks/:taskID gets a task with the given taskID.
 * Sends a response with one of the following content/status code:
 * - 200 and a Task object if the task has been found
 * - 400 if the either boardID or taskID is not valid
 * - 404 if the board has not been found
 * - 500 if an error has occurred
 *
 * @param request - express {@link Request} object
 * @param response - express {@link Response} object
 * @returns Returns {@link Promise}\<void\>
 *
 */

export async function getOne(
  request: Request,
  response: Response
): Promise<void> {
  const { boardID, taskID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.json({ message: 'Board ID is not valid.' });
    } else if (!UUID.isValid(taskID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.json({ message: 'Task ID is not valid.' });
    } else {
      const board = await boardRepo.getByID(boardID);
      if (board) {
        const task = await taskRepo.getByID(taskID);

        if (task) {
          response.status(HTTP_STATUS.OK);
          response.json(task);
        } else {
          response.status(HTTP_STATUS.NOT_FOUND);
          response.json({ message: 'Task with this ID has not been found.' });
        }
      } else {
        response.status(HTTP_STATUS.NOT_FOUND);
        response.json({ message: 'Board with this ID has not been found.' });
      }
    }
  } catch (error) {
    httpErrorHandler(request, response, error);
  }
}

/**
 * Handler for request PUT boards/:boardID/tasks/:taskID updates a task with the given taskID
 * and returns it as a response.
 * Sends a response with one of the following content/status code:
 * - 200 and an updated Task if the task has been successfully updated
 * - 400 if either boardID or taskID is not valid
 * - 404 if the task has not been found
 * - 500 if an error has occurred
 *
 * @param request - express {@link Request} object
 * @param response - express {@link Response} object
 * @returns Returns {@link Promise}\<void\>
 *
 */

export async function findByIdAndUpdate(
  request: Request,
  response: Response
): Promise<void> {
  const { boardID, taskID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.json({ message: 'Board ID is not valid.' });
    } else if (!UUID.isValid(taskID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.json({ message: 'Task ID is not valid.' });
    } else {
      const board = await boardRepo.getByID(boardID);
      if (board) {
        const task = await taskRepo.updateOne({ id: taskID }, request.body);
        if (task) {
          response.status(HTTP_STATUS.OK);
          response.json(task);
        } else {
          response.status(HTTP_STATUS.NOT_FOUND);
          response.json({ message: 'Task with this ID has not been found.' });
        }
      } else {
        response.status(HTTP_STATUS.NOT_FOUND);
        response.json({ message: 'Board with this ID has not been found.' });
      }
    }
  } catch (error) {
    httpErrorHandler(request, response, error);
  }
}

/**
 * Handler for request DELETE /boards/:boardID/tasks/:taskID deletes a task with the given taskID.
 * Sends a response with one of the following content/status code:
 * - 204 if the task has been successfully deleted
 * - 400 if either boardID or taskID is not valid
 * - 404 if the task has not been found
 * - 500 if an error has occurred
 *
 * @param request - express {@link Request} object
 * @param response - express {@link Response} object
 * @returns Returns {@link Promise}\<void\>
 *
 */

export async function findByIdAndDelete(
  request: Request,
  response: Response
): Promise<void> {
  const { boardID, taskID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.json({ message: 'Board ID is not valid.' });
    } else if (!UUID.isValid(taskID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.json({ message: 'Task ID is not valid.' });
    } else {
      const board = await boardRepo.getByID(boardID);
      if (board) {
        const task = await taskRepo.deleteOne({ id: taskID });

        if (task) {
          response.status(HTTP_STATUS.NO_CONTENT);
          response.end();
        } else {
          response.status(HTTP_STATUS.NOT_FOUND);
          response.json({ message: 'Task with this ID has not been found.' });
        }
      } else {
        response.status(HTTP_STATUS.NOT_FOUND);
        response.json({ message: 'Board with this ID has not been found.' });
      }
    }
  } catch (error) {
    httpErrorHandler(request, response, error);
  }
}
