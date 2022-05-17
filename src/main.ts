import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './filters/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  //  app.enableCors({
  //    origin: true,
  //    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //  });
  //  app.useGlobalFilters(new ErrorExceptionFilter());
  await app.listen(5000);
}
bootstrap();
