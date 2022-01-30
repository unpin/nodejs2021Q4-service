import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import HTTP_STATUS from '../../common/constants';
import UUID from '../../utils/uuid/UUID';
import * as userRepo from './user.db';
import { httpErrorHandler } from '../httpErrorHandler';
import { User } from '../../entity/User';

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
    const user = request.body;
    if (!user.login || !user.password) {
      response
        .status(HTTP_STATUS.BAD_REQUEST)
        .send({ message: 'login and password fields are required' });
    } else {
      user.password = bcrypt.hashSync(user.password, 10);
      const saved = await userRepo.createOne(user);
      response.status(HTTP_STATUS.CREATED);
      response.send(toResponse(saved));
    }
  } catch (error) {
    httpErrorHandler(request, response, error);
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

export async function getAll(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const users = await userRepo.getAll();
    response.status(HTTP_STATUS.OK);
    response.send(users.map(toResponse));
  } catch (error) {
    httpErrorHandler(request, response, error);
  }
}

function toResponse(user: User) {
  const publicUser = { ...user };
  delete publicUser.password;
  return publicUser;
}

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
        response.send(toResponse(user));
      } else {
        response.status(HTTP_STATUS.NOT_FOUND);
        response.send({ message: 'User with this ID has not been found.' });
      }
    }
  } catch (error) {
    httpErrorHandler(request, response, error);
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
      if (request.body.password) {
        request.body.password = bcrypt.hashSync(request.body.password, 10);
      }
      const updated = await userRepo.updateOne({ id: userID }, request.body);
      if (updated) {
        response.status(HTTP_STATUS.OK);
        response.send(toResponse(updated));
      } else {
        response.status(HTTP_STATUS.NOT_FOUND);
        response.send({ message: 'User with this ID has not been found.' });
      }
    }
  } catch (error) {
    httpErrorHandler(request, response, error);
  }
}

// /**
//  * Handler for request DELETE /users/:id deletes a user with the given userID.
//  * Sends a response with one of the following content/status code:
//  * - 204 if the user has been successfully deleted
//  * - 400 if the userID is not valid
//  * - 404 if the user has not been found
//  * - 500 if an error has occurred
//  *
//  * @param request - express {@link Request} object
//  * @param response - express {@link Response} object
//  * @returns Returns {@link Promise}\<void\>
//  *
//  */

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
        // await taskRepo.updateMany({ userId: userID }, { userId: null });

        response.status(HTTP_STATUS.NO_CONTENT);
        response.end();
      } else {
        response.status(HTTP_STATUS.NOT_FOUND);
        response.send({ message: 'User with this ID has not been found.' });
      }
    }
  } catch (error) {
    httpErrorHandler(request, response, error);
  }
}
