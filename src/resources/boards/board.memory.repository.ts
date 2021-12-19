import dataSource from '../../database/dataSource';
import Board from './board.model';

/**
 * Creates a new board in the database and returns it.
 *
 * @param board - {@link Board} object to store in the database.
 * @returns Returns created board {@link Promise}\<{@link Board}\>
 *
 */

export async function createOne(board: Board): Promise<Board> {
  return <Board>dataSource.addDocument(Board.name, board);
}

/**
 * Gets all the boards from the database.
 *
 * @returns Returns {@link Promise}\<{@link Board}[]\>
 *
 */

export async function getAll(): Promise<Board[]> {
  return <Board[]>dataSource.getCollection(Board.name);
}

/**
 * Gets a board from the database by boardID.
 *
 * @param boardID - UUID of the board to look for.
 * @returns Returns {@link Promise}\<{@link Board}\> if board was found,
 * {@link Promise}\<null\> otherwise.
 *
 */

export async function getByID(boardID: string): Promise<Board | null> {
  return <Board | null>dataSource.getDocument(Board.name, { id: boardID });
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
): Promise<Board | null> {
  return <Board | null>dataSource.updateDocument(Board.name, query, update);
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

export async function deleteOne(query: Partial<Board>): Promise<Board | null> {
  return <Board | null>dataSource.deleteDocument(Board.name, query);
}

/**
 *
 * Deletes all the boards from the database that match the query.
 *
 * @param query - Partial\<{@link Board}\> that serves as a search query
 * @returns Returns {@link Promise}\<boolean\> where true means that at least
 * one user was deleted, false otherwise
 *
 */

export async function deleteMany(query: Partial<Board>): Promise<boolean> {
  return dataSource.deleteDocuments(Board.name, query);
}
