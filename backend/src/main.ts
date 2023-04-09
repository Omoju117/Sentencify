import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: process.env.ALLOWED_ORIGIN,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });
  app.use(cookieParser());
  dotenv.config();
  const port = process.env.PORT || '8080';
  await app.listen(port);
}
bootstrap();
