import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      exception = this.handleError(exception);
    }

    super.catch(exception, host);
  }

  private handleError(exception: Prisma.PrismaClientKnownRequestError) {
    let result = new BadRequestException();

    if (exception.code === 'P2002') {
      const message = `${exception.meta.target}_DUPLICATE`.toUpperCase();
      result = new BadRequestException(undefined, message);
    }
    if (exception.code === 'P2025') {
      const table = exception.message.split(' ')[1];
      const message = `${table}_NOT_FOUND`.toUpperCase();
      result = new NotFoundException(undefined, message);
    }

    return result;
  }
}
