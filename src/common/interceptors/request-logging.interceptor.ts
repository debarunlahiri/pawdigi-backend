import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '../../core/database/prisma.service';

const SENSITIVE_LOG_KEYS = new Set(['password', 'otp', 'token', 'accessToken', 'refreshToken', 'fcmToken', 'authorization']);
const MAX_LOG_STRING_LENGTH = 1000;

function sanitizeLogValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => sanitizeLogValue(item));
  if (typeof value === 'string') {
    return value.length > MAX_LOG_STRING_LENGTH ? `${value.slice(0, MAX_LOG_STRING_LENGTH)}...[TRUNCATED]` : value;
  }
  if (!value || typeof value !== 'object' || value instanceof Date) return value;

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, item]) => {
      if (SENSITIVE_LOG_KEYS.has(key) || key.toLowerCase().includes('secret')) {
        return [key, '[REDACTED]'];
      }
      return [key, sanitizeLogValue(item)];
    }),
  );
}

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const startedAt = Date.now();
    return next.handle().pipe(
      tap({
        next: () => this.logRequest(req, res, startedAt, 'SUCCESS'),
        error: (error) => this.logRequest(req, res, startedAt, 'ERROR', error),
      }),
    );
  }

  private logRequest(req: any, res: any, startedAt: number, status: string, error?: Error) {
    const durationMs = Date.now() - startedAt;
    req.log?.info?.({ path: req.url, method: req.method, durationMs }, 'request completed');

    void this.prisma.apiRequestLog
      .create({
        data: {
          requestId: req.id,
          userId: req.user?.id,
          userRole: req.user?.role,
          method: req.method,
          path: req.originalUrl ?? req.url,
          route: req.route?.path,
          query: sanitizeLogValue(req.query) as object,
          body: sanitizeLogValue(req.body) as object,
          params: sanitizeLogValue(req.params) as object,
          statusCode: res.statusCode,
          status,
          errorName: error?.name,
          errorMessage: error?.message,
          durationMs,
          ipAddress: req.ip,
          userAgent: req.headers?.['user-agent'],
          referer: req.headers?.referer,
          contentLength: Number(req.headers?.['content-length']) || undefined,
          responseLength: Number(res.getHeader?.('content-length')) || undefined,
        },
      })
      .catch((logError) => {
        req.log?.warn?.({ err: logError }, 'failed to persist api request log');
      });
  }
}
