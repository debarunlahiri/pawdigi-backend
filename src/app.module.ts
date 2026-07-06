import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import appConfig from './config/app.config';
import corsConfig from './config/cors.config';
import databaseConfig from './config/database.config';
import { envValidationSchema } from './config/env.validation';
import jwtConfig from './config/jwt.config';
import paymentConfig from './config/payment.config';
import redisConfig from './config/redis.config';
import smsConfig from './config/sms.config';
import storageConfig from './config/storage.config';
import { CacheModule } from './core/cache/cache.module';
import { DatabaseModule } from './core/database/database.module';
import { HealthModule } from './core/health/health.module';
import { LoggerModule } from './core/logger/logger.module';
import { FirebaseModule } from './integrations/firebase/firebase.module';
import { PaymentIntegrationModule } from './integrations/payment/payment.module';
import { SmsModule } from './integrations/sms/sms.module';
import { StorageModule } from './integrations/storage/storage.module';
import { JobsModule } from './jobs/jobs.module';
import { AdminDashboardModule } from './modules/admin-dashboard/admin-dashboard.module';
import { AdminsModule } from './modules/admins/admins.module';
import { ApiLogsModule } from './modules/api-logs/api-logs.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { AuthModule } from './modules/auth/auth.module';
import { CartsModule } from './modules/carts/carts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DewormingModule } from './modules/deworming/deworming.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { GuardiansModule } from './modules/guardians/guardians.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { MedicalRecordsModule } from './modules/medical-records/medical-records.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PetPassportsModule } from './modules/pet-passports/pet-passports.module';
import { PetsModule } from './modules/pets/pets.module';
import { ProductsModule } from './modules/products/products.module';
import { RemindersModule } from './modules/reminders/reminders.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { SchedulerRunLogsModule } from './modules/scheduler-logs/scheduler-run-logs.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ShipmentsModule } from './modules/shipments/shipments.module';
import { UsersModule } from './modules/users/users.module';
import { VaccinationsModule } from './modules/vaccinations/vaccinations.module';
import { VendorsModule } from './modules/vendors/vendors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      load: [appConfig, corsConfig, databaseConfig, jwtConfig, paymentConfig, redisConfig, smsConfig, storageConfig],
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          { name: 'short', ttl: 1000, limit: 10 },
          { name: 'medium', ttl: 60000, limit: config.get<number>('GLOBAL_RATE_LIMIT_PER_MINUTE') ?? 120 },
          { name: 'long', ttl: 900000, limit: 1000 },
          { name: 'auth', ttl: 60000, limit: config.get<number>('AUTH_RATE_LIMIT_PER_MINUTE') ?? 5 },
          { name: 'otp', ttl: 600000, limit: config.get<number>('OTP_RATE_LIMIT_PER_10_MINUTES') ?? 3 },
        ],
      }),
    }),
    DatabaseModule,
    LoggerModule,
    CacheModule,
    HealthModule,
    FirebaseModule,
    StorageModule,
    PaymentIntegrationModule,
    SmsModule,
    JobsModule,
    AuthModule,
    UsersModule,
    CustomersModule,
    AdminsModule,
    VendorsModule,
    PetsModule,
    GuardiansModule,
    PetPassportsModule,
    VaccinationsModule,
    DewormingModule,
    MedicalRecordsModule,
    DocumentsModule,
    RemindersModule,
    NotificationsModule,
    CategoriesModule,
    ProductsModule,
    InventoryModule,
    CartsModule,
    OrdersModule,
    PaymentsModule,
    ShipmentsModule,
    ReviewsModule,
    SchedulerRunLogsModule,
    AdminDashboardModule,
    ReportsModule,
    ApiLogsModule,
    AuditLogsModule,
    SettingsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
