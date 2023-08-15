import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  app.use(require('cookie-parser')());
  await app.listen(3000);
}
bootstrap();
