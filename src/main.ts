import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { RequestLoggingInterceptor } from './common/interceptors/request-logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { PrismaService } from './core/database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true, rawBody: true });
  const config = app.get(ConfigService);
  const apiPrefix = config.get<string>('app.apiPrefix') ?? 'api';
  const origins = config.get<string[]>('app.corsOrigins') ?? [];

  app.use(helmet());
  app.enableCors({
    origin: config.get<string>('app.env') === 'production' ? origins : true,
    credentials: true,
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
