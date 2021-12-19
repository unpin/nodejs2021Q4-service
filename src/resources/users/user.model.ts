import SchemaValidationError from '../../database/error/SchemaValidationError';
import Model from '../../database/Model';
import Schema from '../../database/schema/Schema';
import UUID from '../../utils/uuid/UUID';

export default class User extends Model {
  name?: string;

  login?: string;

  password?: string;

  /**
   *
   * Creates an instance of User from provided data object.
   *
   * @param data - object with user data
   * @returns Returns {@link User} instance
   *
   */

  constructor(data: User) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.login = data.login;
    this.password = data.password;
  }

  /**
   * Returns trimmed user data that is safe to send as a response
   *
   * @param user - {@link User} instance
   * @returns Returns trimmed user data without a password
   *
   */

  static toResponse(user: User): Partial<User> {
    const publicUser = { ...user };
    delete publicUser.password;
    return publicUser;
  }

  /**
   *
   * Creates an instance of User class from data provided in object.
   *
   * @throws {@link SchemaValidationError} if user data is not valid
   * @returns Returns void
   *
   */

  validate(): void {
    type UserProps = keyof User;
    const keys = Object.keys(this) as UserProps[];

    keys.forEach((key) => {
      if (User.schema[key].required && !this[key]) {
        throw new SchemaValidationError(`${key} is required`);
      }
    });
  }

  static schema: Schema = {
    id: {
      type: UUID,
    },
    name: {
      type: String,
      minlen: 1,
      required: true,
    },
    login: {
      type: String,
      minlen: 1,
      required: true,
    },
    password: {
      type: String,
      minlen: 1,
      required: true,
    },
  };
}
