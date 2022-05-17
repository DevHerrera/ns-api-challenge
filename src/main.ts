import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './filters/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //  app.useGlobalFilters(new ErrorExceptionFilter());
  await app.listen(3000);
}
bootstrap();
