import { Request, Response } from 'express';
import HTTP_STATUS from '../../common/constants';
import UUID from '../../utils/uuid/UUID';
import { httpErrorHandler } from '../httpErrorHandler';
import * as taskRepo from '../tasks/task.memory.repository';
import * as boardRepo from './board.memory.repository';
import Board from './board.model';

/**
 * Handler for request POST /boards creates a new Board in the database.
 * Sends a response with one of the following content/status code:
 * - 200 and a Board object if the board has been created successfully.
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
  try {
    const board = new Board(request.body);
    board.validate();
    const saved = await boardRepo.createOne(board);
    response.status(HTTP_STATUS.CREATED);
    response.json(saved);
  } catch (error) {
    httpErrorHandler(request, response, error);
  }
}

/**
 * Handler for request GET /boards gets all boards
 * Sends a response with one of the following content/status code:
 * - 200 and an array of Board objects
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
    const boards = await boardRepo.getAll();
    response.status(HTTP_STATUS.OK);
    response.json(boards);
  } catch (error) {
    httpErrorHandler(request, response, error);
  }
}

/**
 * Handler for request GET /boards/:boardID gets a Board with the given boardID.
 * Sends a response with one of the following content/status code:
 * - 200 and a Board object if the board has been found
 * - 400 if the boardID is not valid
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
  const { boardID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.json({ message: 'Board ID is not valid.' });
    } else {
      const board = await boardRepo.getByID(boardID);
      if (board) {
        response.status(HTTP_STATUS.OK);
        response.json(board);
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
 * Handler for request PUT /boards/:boardID updates a board with the given boardID
 * and returns it as a response.
 * Sends a response with one of the following content/status code:
 * - 200 and an updated Board if the board has been successfully updated
 * - 400 if the boardID is not valid
 * - 404 if the board has not been found
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
  const { boardID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.json({ message: 'Board ID is not valid.' });
    } else {
      const updated = await boardRepo.updateOne({ id: boardID }, request.body);
      if (updated) {
        response.status(HTTP_STATUS.OK);
        response.json(updated);
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
 * Handler for request DELETE /boards/:boardID deletes a board with the given boardID.
 * Sends a response with one of the following content/status code:
 * - 204 if the board has been successfully deleted
 * - 400 if the boardID is not valid
 * - 404 if the board has not been found
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
  const { boardID } = request.params;
  try {
    if (!UUID.isValid(boardID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.json({ message: 'Board ID is not valid.' });
    } else {
      const board = await boardRepo.deleteOne({ id: boardID });
      if (board) {
        await boardRepo.deleteOne({ id: boardID });
        await taskRepo.deleteMany({ boardId: boardID });
        response.status(HTTP_STATUS.NO_CONTENT);
        response.end();
      } else {
        response.status(HTTP_STATUS.NOT_FOUND);
        response.json({ message: 'Board with this ID has not been found.' });
      }
    }
  } catch (error) {
    httpErrorHandler(request, response, error);
  }
}
