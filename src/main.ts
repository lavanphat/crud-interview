import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('CRUD Interview')
    .setDescription('The project for CRUD interview')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  // Run server
  await app.listen(5000);
  Logger.debug(`Server start in port 5000`);
}
bootstrap();
