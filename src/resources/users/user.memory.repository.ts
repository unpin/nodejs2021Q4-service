import dataSource from '../../database/dataSource';
import User from './user.model';

/**
 * Creates a new user in the database and returns it.
 *
 * @param user - {@link User} object to store in the database.
 * @returns Returns created user {@link Promise}\<{@link User}\>
 *
 */

export async function createOne(user: User): Promise<User> {
  return <User>dataSource.addDocument(User.name, user);
}

/**
 * Gets all the users from the database.
 *
 * @returns Returns {@link Promise}\<{@link User}[]\>
 *
 */

export async function getAll(): Promise<User[]> {
  return <User[]>dataSource.getCollection(User.name);
}

/**
 * Gets a user from the database by userID.
 *
 * @param userID - UUID of the user to look for.
 * @returns Returns {@link Promise}\<{@link User}\> if user was found,
 * {@link Promise}\<null\> otherwise.
 *
 */

export async function getByID(userID: string): Promise<User | null> {
  return <User | null>dataSource.getDocument(User.name, { id: userID });
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
): Promise<User | null> {
  return <User | null>dataSource.updateDocument(User.name, query, update);
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

export async function deleteOne(query: Partial<User>): Promise<User | null> {
  return <User | null>dataSource.deleteDocument(User.name, query);
}

/**
 *
 * Deletes all the users from the database that match the query.
 *
 * @param query - Partial\<{@link User}\> that serves as a search query
 * @returns Returns {@link Promise}\<boolean\> where true means that at least
 * one user was deleted, false otherwise
 *
 */

export async function deleteMany(query: Partial<User>): Promise<boolean> {
  return dataSource.deleteDocuments(User.name, query);
}
