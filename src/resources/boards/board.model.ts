import SchemaValidationError from '../../database/error/SchemaValidationError';
import Model from '../../database/Model';

export default class Board extends Model {
  title: string;

  columns: string[];

  /**
   * Creates an instance of Board class from data provided in object.
   *
   * @param data - object with user data
   *
   */

  constructor(data: Board) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.columns = data.columns;
  }

  /**
   *
   * Validates an instance of Board class
   *
   * @throws {@link SchemaValidationError} if board data is not valid
   * @returns Returns void
   *
   */

  validate(): void {
    if (!this.title) {
      throw new SchemaValidationError('Board.title is required');
    }
  }
}
