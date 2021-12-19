export default abstract class Model {
  id?: string;

  abstract validate(): void;
}
