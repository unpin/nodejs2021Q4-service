import { getRepository } from 'typeorm';
import { Task } from '../../entity/Task';

/**
 * Creates a new Task in the database and returns it.
 *
 * @param Task - {@link Task} object to store in the database.
 * @returns Returns created task {@link Promise}\<{@link Task}\>
 *
 */

export async function createOne(task: Task): Promise<Task> {
  const newUser = await getRepository(Task).create(task);
  return getRepository(Task).save(newUser);
}

/**
 * Gets all the tasks from the database.
 *
 * @returns Returns {@link Promise}\<{@link Task}[]\>
 *
 */

export async function getAll(): Promise<Task[]> {
  return getRepository(Task).find();
}

/**
 * Gets a task from the database by taskID.
 *
 * @param taskID - UUID of the task to look for.
 * @returns Returns {@link Promise}\<{@link Task}\> if task was found,
 * {@link Promise}\<undefined\> otherwise.
 *
 */

export async function getByID(taskID: string): Promise<Task | undefined> {
  return getRepository(Task).findOne({ id: taskID });
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
): Promise<Task | undefined> {
  const task = await getRepository(Task).findOne(query);
  if (task) {
    getRepository(Task).merge(task, update);
    return getRepository(Task).save(task);
  }
  return undefined;
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
): Promise<Task[]> {
  const tasks = await getRepository(Task).find(query);
  tasks.forEach((task) => {
    getRepository(Task).merge(task, update);
    getRepository(Task).save(task);
  });
  return tasks;
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

export async function deleteOne(query: Partial<Task>): Promise<boolean> {
  const result = await getRepository(Task).delete(query);
  if (result && result.affected && result.affected > 0) {
    return true;
  }
  return false;
}
