import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit = 50, offset = 0 } = paginationQueryDto;
    return this.userRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      const message = `User with the id ${id} is not found`;
      Logger.debug(message);
      throw new NotFoundException(message);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { login: createUserDto.login },
    });
    if (userExists) {
      const message = `User with this login already exists`;
      Logger.debug(message);
      throw new ConflictException(message);
    }
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!user) {
      const message = `User with the id ${id} is not found`;
      Logger.debug(message);
      throw new NotFoundException(message);
    }
    const updated = await this.userRepository.save(user);
    return User.toResponse(updated);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
