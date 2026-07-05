import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
    const message = typeof payload === 'object' && payload !== null && 'message' in payload ? (payload as any).message : payload;

    response.status(status).json({
      success: false,
      message: Array.isArray(message) ? 'Validation failed' : message,
      errorCode: this.errorCode(status),
      errors: Array.isArray(message) ? message : [],
    });
  }

  private errorCode(status: number): string {
    const codes: Record<number, string> = {
      400: 'VALIDATION_ERROR',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      429: 'RATE_LIMITED',
      500: 'INTERNAL_SERVER_ERROR',
    };
    return codes[status] ?? 'INTERNAL_SERVER_ERROR';
  }
}
