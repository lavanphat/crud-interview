import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Run server
  await app.listen(5000);
  Logger.debug(`Server start in port 5000`);
}
bootstrap();
