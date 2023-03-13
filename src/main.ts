import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './util/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Handle error
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(httpAdapter));

  // Setup class validator
  app.useGlobalPipes(
    new ValidationPipe({ forbidUnknownValues: false, transform: true }),
  );

  // Run server
  await app.listen(5000);
  Logger.debug(`Server start in port 5000`);
}
bootstrap();
