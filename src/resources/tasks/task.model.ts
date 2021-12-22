import SchemaValidationError from '../../database/error/SchemaValidationError';
import Model from '../../database/Model';

export default class Task extends Model {
  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId?: string;

  /**
   * Creates an instance of Task class from data provided in object.
   *
   * @param data - object with user data
   *
   */

  constructor(data: Task) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.order = data.order;
    this.description = data.description;
    this.userId = data.userId;
    this.boardId = data.boardId;
    this.columnId = data.columnId;
  }

  /**
   *
   * Validates an instance of Task class
   *
   * @throws {@link SchemaValidationError} if task data is not valid
   * @returns Returns void
   *
   */

  validate(): void {
    if (!this.title) {
      throw new SchemaValidationError('Tasl.title is required');
    }
  }
}
