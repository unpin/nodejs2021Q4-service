import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [ConfigModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
