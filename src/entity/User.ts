import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET_KEY } from '../common/config';
import SchemaValidationError from '../database/error/SchemaValidationError';
import Schema from '../database/schema/Schema';
import UUID from '../utils/uuid/UUID';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password?: string;

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

  generateToken() {
    return jwt.sign({ usedId: this.id, login: this.login }, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
  }

  passwordsMatch(password: string) {
    if (!this.password) {
      return false;
    }
    return bcrypt.compareSync(password, this.password);
  }
}
