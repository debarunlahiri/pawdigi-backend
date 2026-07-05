import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

const SENSITIVE_RESPONSE_KEYS = new Set(['passwordHash', 'otpHash', 'otpCode', 'tokenHash']);

function sanitizeResponse(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeResponse(item));
  }

  if (!value || typeof value !== 'object' || value instanceof Date) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !SENSITIVE_RESPONSE_KEYS.has(key))
      .map(([key, item]) => [key, sanitizeResponse(item)]),
  );
}

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((response) => {
        if (response?.success !== undefined) {
          return sanitizeResponse(response);
        }
        return {
          success: true,
          message: response?.message ?? 'Operation successful',
          data: sanitizeResponse(response?.data ?? response),
          meta: sanitizeResponse(response?.meta),
        };
      }),
    );
  }
}
