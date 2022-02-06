import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { AuthDto } from './dto/auth-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signIn(authDto: AuthDto) {
    const user = await this.findOne(authDto.login);
    if (!user.passwordsMatch(authDto.password)) {
      const message = `Login or password is incorrect`;
      Logger.debug(message);
      throw new ForbiddenException(message);
    }
    const token = user.generateJWTToken();
    return { token };
  }

  private async findOne(login: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { login },
      select: ['id', 'login', 'password'],
    });
    if (!user) {
      const message = `Login or password is incorrect`;
      Logger.debug(message);
      throw new ForbiddenException(message);
    }
    return user;
  }
}
