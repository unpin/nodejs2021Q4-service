import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import fmp from 'fastify-multipart';
import { FileLogger } from './logger/logger.service';

async function bootstrap() {
  let app;

  if (process.env.USE_FASTIFY === 'true') {
    console.log('Application is powered by Fastify');
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.register(fmp);
  } else {
    console.log('Application app is powered Express');
    app = await NestFactory.create(AppModule);
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.useLogger(app.get(FileLogger));
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
