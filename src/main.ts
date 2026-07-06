import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { RequestLoggingInterceptor } from './common/interceptors/request-logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { PrismaService } from './core/database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true, bodyParser: false });
  const config = app.get(ConfigService);
  const apiPrefix = config.get<string>('app.apiPrefix') ?? 'api';
  const origins = config.get<string[]>('app.corsOrigins') ?? [];
  const isProduction = config.get<string>('app.env') === 'production';
  const httpAdapter = app.getHttpAdapter().getInstance();

  httpAdapter.set('trust proxy', 1);
  httpAdapter.disable('x-powered-by');
  app.use(
    json({
      limit: '256kb',
      verify: (req: any, _res, buffer) => {
        req.rawBody = buffer;
      },
    }),
  );
  app.use(urlencoded({ extended: false, limit: '64kb' }));
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      referrerPolicy: { policy: 'no-referrer' },
      hsts: isProduction ? { maxAge: 15552000, includeSubDomains: true, preload: false } : false,
    }),
  );
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || !isProduction || origins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'X-Requested-With', 'X-Request-Id', 'X-Razorpay-Signature', 'X-Razorpay-Event-Id'],
    credentials: true,
    maxAge: 600,
  });
  app.setGlobalPrefix(apiPrefix);
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new PrismaExceptionFilter(), new HttpExceptionFilter());
  app.useGlobalInterceptors(new RequestLoggingInterceptor(app.get(PrismaService)), new ResponseInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PawDigi API')
    .setDescription('PawDigi mobile, admin, and vendor backend APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup(`${apiPrefix}/docs`, app, SwaggerModule.createDocument(app, swaggerConfig));

  await app.listen(config.get<number>('app.port') ?? 3000);
}

bootstrap();
