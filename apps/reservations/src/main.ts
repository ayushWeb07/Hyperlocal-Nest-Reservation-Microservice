import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);

  // use api prefix
  app.setGlobalPrefix('api/v1');

  // register the validation filters
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
