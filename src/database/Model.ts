export default abstract class Model {
  id?: string;

  /**
   *
   * Method should validate the model data
   *
   * @throws {@link SchemaValidationError} if model data is not valid
   * @returns Returns void
   *
   */

  abstract validate(): void;
}
