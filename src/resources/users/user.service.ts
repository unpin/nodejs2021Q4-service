import { Request, Response } from 'express';
import HTTP_STATUS from '../../common/constants';
import SchemaValidationError from '../../database/error/SchemaValidationError';
import UUID from '../../utils/uuid/UUID';
import * as userRepo from './user.memory.repository';
import * as taskRepo from '../tasks/task.memory.repository';
import User from './user.model';

/**
 * Handler for request POST /users creates a new User in the database.
 * Sends a response with one of the following content/status code:
 * - 200 and a User object if the user has been created successfully.
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
    const user = new User(request.body);
    user.validate();
    const saved = await (<Promise<User>>userRepo.createOne(user));
    response.status(HTTP_STATUS.CREATED);
    response.send(User.toResponse(saved));
  } catch (error) {
    if (error instanceof SchemaValidationError) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.send({ message: error.message });
    } else if (error instanceof Error) {
      process.stderr.write(error.message);
    }
    response.status(HTTP_STATUS.INTERNAL_ERROR);
    response.end();
  }
}

/**
 * Handler for request GET /users gets all users
 * Sends a response with one of the following content/status code:
 * - 200 and an array of User objects
 * - 500 if an error has occurred
 *
 * @param request - express {@link Request} object
 * @param response - express {@link Response} object
 * @returns Returns {@link Promise}\<void\>
 *
 */

export async function getAll(_: Request, response: Response): Promise<void> {
  try {
    const users = await userRepo.getAll();
    response.status(HTTP_STATUS.OK);
    response.send(users.map(User.toResponse));
  } catch (error) {
    if (error instanceof Error) {
      process.stderr.write(error.message);
    }
    response.status(HTTP_STATUS.INTERNAL_ERROR);
    response.end();
  }
}

/**
 * Handler for request GET /users/:id gets a user with the given userID.
 * Sends a response with one of the following content/status code:
 * - 200 and a User object if the user has been found
 * - 400 if the userID is not valid
 * - 404 if the user has not been found
 * - 500 if an error has occurred
 *
 * @param request - express {@link Request} object
 * @param response - express {@link Response} object
 * @returns Returns {@link Promise}\<void\>
 *
 */

export async function getById(
  request: Request,
  response: Response
): Promise<void> {
  const { userID } = request.params;
  try {
    if (!UUID.isValid(userID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.send({ message: 'User ID is not valid.' });
    } else {
      const user = await userRepo.getByID(userID);
      if (user) {
        response.status(HTTP_STATUS.OK);
        response.send(User.toResponse(user));
      } else {
        response.status(HTTP_STATUS.NOT_FOUND);
        response.send({ message: 'User with this ID has not been found.' });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      process.stderr.write(error.message);
    }
    response.status(HTTP_STATUS.INTERNAL_ERROR);
    response.end();
  }
}

/**
 * Handler for request PUT /users/:id updates a user with the given userID
 * and returns it as a response.
 * Sends a response with one of the following content/status code:
 * - 200 and an updated User if the user has been successfully updated
 * - 400 if the userID is not valid
 * - 404 if the user has not been found
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
  const { userID } = request.params;
  try {
    if (!UUID.isValid(userID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.send({ message: 'User ID is not valid.' });
    } else {
      const updated = await userRepo.updateOne({ id: userID }, request.body);
      if (updated) {
        response.status(HTTP_STATUS.OK);
        response.send(User.toResponse(updated));
      } else {
        response.status(HTTP_STATUS.NOT_FOUND);
        response.send({ message: 'User with this ID has not been found.' });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      process.stderr.write(error.message);
    }
    response.status(HTTP_STATUS.INTERNAL_ERROR);
    response.end();
  }
}

/**
 * Handler for request DELETE /users/:id deletes a user with the given userID.
 * Sends a response with one of the following content/status code:
 * - 204 if the user has been successfully deleted
 * - 400 if the userID is not valid
 * - 404 if the user has not been found
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
  const { userID } = request.params;
  try {
    if (!UUID.isValid(userID)) {
      response.status(HTTP_STATUS.BAD_REQUEST);
      response.send({ message: 'User ID is not valid.' });
    } else {
      const user = await userRepo.deleteOne({ id: userID });
      if (user) {
        await userRepo.deleteOne({ id: userID });
        await taskRepo.updateMany({ userId: userID }, { userId: null });

        response.status(HTTP_STATUS.NO_CONTENT);
        response.end();
      } else {
        response.status(HTTP_STATUS.NOT_FOUND);
        response.send({ message: 'User with this ID has not been found.' });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      process.stderr.write(error.message);
    }
    response.status(HTTP_STATUS.INTERNAL_ERROR);
    response.end();
  }
}
