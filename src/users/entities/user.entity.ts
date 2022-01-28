import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  static toResponse(user: Omit<User, 'id'>) {
    const publicUser = { ...user };
    delete publicUser.password;
    return publicUser;
  }
}
