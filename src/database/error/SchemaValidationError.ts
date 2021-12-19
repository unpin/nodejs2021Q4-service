export default class SchemaValidationError extends Error {
  /**
   *
   * Creates an instance of SchemaValidationError.
   *
   * @param message - string message
   * @returns {@link SchemaValidationError}
   *
   */
  constructor(message: string) {
    super(message);
    this.name = SchemaValidationError.name;
  }
}
