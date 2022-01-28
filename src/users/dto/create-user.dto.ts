import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly login: string;

  @IsString()
  readonly password: string;
}
