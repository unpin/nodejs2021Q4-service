import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  login: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  static toResponse(user: Omit<User, 'id'>) {
    const publicUser = { ...user };
    delete publicUser.password;
    return publicUser;
  }

  generateJWTToken() {
    return jwt.sign(
      { usedId: this.id, login: this.login },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '12h',
      },
    );
  }

  passwordsMatch(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
