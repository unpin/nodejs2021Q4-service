import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { USE_FASTIFY, PORT } from './common/config';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  let app;

  if (USE_FASTIFY === 'true') {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.enableCors();

  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
