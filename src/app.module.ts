import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { BoardModule } from './boards/board.module';
import { ColumnModule } from './columns/column.module';
import { TaskModule } from './tasks/task.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './files/file.module';
import { LoggerModule } from './logger/logger.module';
import { User } from './users/entities/user.entity';
import { Board } from './boards/entities/board.entity';
import { BoardColumn } from './columns/entities/column.entity';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        autoLoadEntities: false,
        synchronize: false,
        migrationsRun: false,
        entities: [User, Board, BoardColumn, Task],
      }),
    }),
    UserModule,
    BoardModule,
    ColumnModule,
    TaskModule,
    AuthModule,
    FileModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerModule],
})
export class AppModule {}
