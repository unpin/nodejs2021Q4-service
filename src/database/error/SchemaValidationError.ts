export default class SchemaValidationError extends Error {
  /**
   * Creates an instance of SchemaValidationError.
   *
   * @param message - string message
   *
   */
  constructor(message: string) {
    super(message);
    this.name = SchemaValidationError.name;
  }
}
