import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.code === 'P2002' ? 409 : 400;
    response.status(status).json({
      success: false,
      message: exception.code === 'P2002' ? 'Unique constraint violation' : 'Database request failed',
      errorCode: exception.code,
      errors: [],
    });
  }
}
