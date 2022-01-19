import { getRepository } from 'typeorm';
import { Board } from '../../entity/Board';

/**
 * Creates a new board in the database and returns it.
 *
 * @param board - {@link Board} object to store in the database.
 * @returns Returns created board {@link Promise}\<{@link Board}\>
 *
 */

export async function createOne(board: Board): Promise<Board> {
  const newUser = await getRepository(Board).create(board);
  return getRepository(Board).save(newUser);
}

/**
 * Gets all the boards from the database.
 *
 * @returns Returns {@link Promise}\<{@link Board}[]\>
 *
 */

export async function getAll(): Promise<Board[]> {
  return getRepository(Board).find();
}

/**
 * Gets a board from the database by boardID.
 *
 * @param boardID - UUID of the board to look for.
 * @returns Returns {@link Promise}\<{@link Board}\> if board was found,
 * {@link Promise}\<undefined\> otherwise.
 *
 */

export async function getByID(boardID: string): Promise<Board | undefined> {
  return getRepository(Board).findOne({ id: boardID });
}

/**
 * Finds board that matches the query and updates it with the properties provided in the update object.
 *
 * @param query - Partial\<{@link Board}\> that serves as a search query.
 * @param update - Partial\<{@link Board}\> object that that contains updated properties.
 * @returns Returns {@link Promise}\<{@link Board}\> updated board
 *
 */

export async function updateOne(
  query: Partial<Board>,
  update: Partial<Board>
): Promise<Board | undefined> {
  const board = await getRepository(Board).findOne(query);
  if (board) {
    getRepository(Board).merge(board, update);
    return getRepository(Board).save(board);
  }
  return undefined;
}

/**
 *
 * Deletes one board from the database that matches the query.
 *
 * @param query - Partial\<{@link Board}\> that serves as a search query
 * @returns Returns {@link Promise}\<{@link Board}\> if board was deleted,
 * and {@link Promise}\<null\> otherwise.
 *
 */

export async function deleteOne(query: Partial<Board>): Promise<boolean> {
  const result = await getRepository(Board).delete(query);
  if (result && result.affected && result.affected > 0) {
    return true;
  }
  return false;
}
