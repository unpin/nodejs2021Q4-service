import dataSource from '../../database/dataSource';
import Task from './task.model';

/**
 * Creates a new Task in the database and returns it.
 *
 * @param Task - {@link Task} object to store in the database.
 * @returns Returns created task {@link Promise}\<{@link Task}\>
 *
 */

export async function createOne(task: Task): Promise<Task> {
  return <Task>dataSource.addDocument(Task.name, task);
}

/**
 * Gets all the tasks from the database.
 *
 * @returns Returns {@link Promise}\<{@link Task}[]\>
 *
 */

export async function getAll(): Promise<Task[]> {
  return <Task[]>dataSource.getCollection(Task.name);
}

/**
 * Gets a task from the database by taskID.
 *
 * @param taskID - UUID of the task to look for.
 * @returns Returns {@link Promise}\<{@link Task}\> if task was found,
 * {@link Promise}\<null\> otherwise.
 *
 */

export async function getByID(taskID: string): Promise<Task | null> {
  return <Task | null>dataSource.getDocument(Task.name, { id: taskID });
}

/**
 * Finds task that matches the query and updates it with the properties provided in the update object.
 *
 * @param query - Partial\<{@link Task}\> that serves as a search query.
 * @param update - Partial\<{@link Task}\> object that that contains updated properties.
 * @returns Returns {@link Promise}\<{@link Task}\> updated task
 *
 */

export async function updateOne(
  query: Partial<Task>,
  update: Partial<Task>
): Promise<Task | null> {
  return <Task | null>dataSource.updateDocument(Task.name, query, update);
}

/**
 * Finds all the tasks that match the query and updates them with the properties provided in the update object.
 *
 * @param query - Partial\<{@link Task}\> that serves as a search query.
 * @param update - Partial\<{@link Task}\> object that that contains updated properties.
 * @returns Returns {@link Promise}\<{@link Task}[]\> updated task
 *
 */

export async function updateMany(
  query: Partial<Task>,
  update: Partial<Task>
): Promise<boolean> {
  return dataSource.updateDocuments(Task.name, query, update);
}

/**
 *
 * Deletes one task from the database that matches the query.
 *
 * @param query - Partial\<{@link Task}\> that serves as a search query
 * @returns Returns {@link Promise}\<{@link Task}\> if task was deleted,
 * and {@link Promise}\<null\> otherwise.
 *
 */

export async function deleteOne(query: Partial<Task>): Promise<Task | null> {
  return <Task | null>dataSource.deleteDocument(Task.name, query);
}

/**
 *
 * Deletes all the tasks from the database that match the query.
 *
 * @param query - Partial\<{@link Task}\> that serves as a search query
 * @returns Returns {@link Promise}\<boolean\> where true means that at least
 * one user was deleted, false otherwise
 *
 */

export async function deleteMany(query: Partial<Task>): Promise<boolean> {
  return dataSource.deleteDocuments(Task.name, query);
}
