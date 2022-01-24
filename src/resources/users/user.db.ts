import { getRepository } from 'typeorm';
import { Task } from '../../entity/Task';
import { User } from '../../entity/User';

/**
 * Creates a new user in the database and returns it.
 *
 * @param user - {@link User} object to store in the database.
 * @returns Returns created user {@link Promise}\<{@link User}\>
 *
 */

export async function createOne(user: User): Promise<User> {
  const newUser = getRepository(User).create(user);
  return getRepository(User).save(newUser);
}

/**
 * Gets all the users from the database.
 *
 * @returns Returns {@link Promise}\<{@link User}[]\>
 *
 */

export async function getAll(): Promise<User[]> {
  return getRepository(User).find();
}

/**
 * Gets a user from the database by userID.
 *
 * @param userID - UUID of the user to look for.
 * @returns Returns {@link Promise}\<{@link User}\> if user was found,
 * {@link Promise}\<undefined\> otherwise.
 *
 */

export async function getByID(userID: string): Promise<User | undefined> {
  return getRepository(User).findOne({ id: userID });
}

/**
 * Finds user that matches the query and updates it with the properties provided in the update object.
 *
 * @param query - Partial\<{@link User}\> that serves as a search query.
 * @param update - Partial\<{@link User}\> object that that contains updated properties.
 * @returns Returns {@link Promise}\<{@link User}\> updated user
 *
 */

export async function updateOne(
  query: Partial<User>,
  update: Partial<User>
): Promise<User | undefined> {
  const user = await getRepository(User).findOne(query);
  if (user) {
    getRepository(User).merge(user, update);
    return getRepository(User).save(user);
  }
  return undefined;
}

/**
 *
 * Deletes one user from the database that matches the query.
 *
 * @param query - Partial\<{@link User}\> that serves as a search query
 * @returns Returns {@link Promise}\<{@link User}\> if user was deleted,
 * and Promise\<null\> otherwise.
 *
 */

export async function deleteOne(query: Partial<User>): Promise<boolean> {
  const result = await getRepository(User).delete(query);
  if (result && result.affected && result.affected > 0) {
    const tasks = await getRepository(Task).find({ userId: query.id });
    tasks.forEach((task) => {
      getRepository(Task).merge(task, { userId: null });
      getRepository(User).save(task);
    });
    return true;
  }
  return false;
}
