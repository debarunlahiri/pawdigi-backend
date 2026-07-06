# PawDigi Backend Documentation

## Overview

PawDigi backend is a NestJS modular monolith for:

- React Native customer mobile app
- Next.js admin panel
- Next.js vendor portal
- Digital pet passport
- Pet health records
- Guardian access
- Product catalog and commerce
- Vendor onboarding
- Admin monitoring

There is no customer website, public blog, public CMS, contact form, or customer web dashboard module.

## Task Tracker

Completed and pending project work is tracked in:

```txt
docs/TASK_STATUS.md
```

## Tech Stack

| Area | Technology |
| --- | --- |
| Runtime | Node.js LTS |
| Framework | NestJS |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Customer auth | Backend-managed Twilio SMS OTP |
| Admin/vendor auth | Email/password + JWT |
| Hashing | bcrypt |
| Queue | BullMQ |
| Cache/queue backend | Redis |
| Notifications | Firebase Cloud Messaging |
| Storage | S3-compatible object storage |
| Payments | Razorpay abstraction |
| API docs | Swagger/OpenAPI |
| Tests | Jest |
| Containers | Docker, Docker Compose |

## Directory Structure

```txt
src/
  main.ts
  app.module.ts
  config/
  core/
    database/
    logger/
    cache/
    health/
  common/
    constants/
    decorators/
    dto/
    enums/
    exceptions/
    filters/
    guards/
    interceptors/
    interfaces/
    pipes/
    utils/
  integrations/
    firebase/
    payment/
    sms/
    storage/
  jobs/
    reminder-jobs/
    passport-jobs/
    notification-jobs/
  modules/
    auth/
    users/
    customers/
    admins/
    vendors/
    pets/
    guardians/
    pet-passports/
    vaccinations/
    deworming/
    medical-records/
    documents/
    reminders/
    notifications/
    categories/
    products/
    inventory/
    carts/
    orders/
    payments/
    shipments/
    reviews/
    reports/
    audit-logs/
```

## API Versioning

URI versioning is enabled globally.

```txt
Base URL: http://localhost:3000/api/v1
Swagger:  http://localhost:3000/api/docs
```

Controllers declare `version: '1'`. Future versions should be added at controller/routing level, not inside services.

## Database Naming

Prisma model names stay in PascalCase for TypeScript usage, while physical PostgreSQL tables use explicit enterprise-style `snake_case` plural names via `@@map`.

Key operational tables:

| Prisma model | PostgreSQL table |
| --- | --- |
| `OtpVerification` | `otp_challenges` |
| `ApiRequestLog` | `api_request_logs` |
| `SchedulerRunLog` | `scheduler_execution_logs` |
| `AuditLog` | `audit_event_logs` |
| `RefreshToken` | `refresh_token_sessions` |

Core business tables follow the same convention, for example `users`, `customer_profiles`, `vendor_profiles`, `pet_passports`, `vaccination_records`, `order_items`, and `product_images`.

Commerce and operational tables are intentionally detailed. The service layer populates lifecycle/status fields, pricing snapshots, provider identifiers, timestamps, and audit metadata for carts, cart items, device tokens, inventories, notifications, orders, order items, payments, pet passports, product images, refresh-token sessions, reviews, and shipments.

## Authentication

### Customer Mobile Authentication

Customers authenticate through backend-managed Twilio SMS OTP in the React Native app.

1. Mobile app calls `POST /api/v1/customer/auth/request-otp` with phone number and device ID.
2. Backend generates a short-lived OTP, stores only its hash, and sends the OTP through Twilio SMS.
3. Mobile app calls `POST /api/v1/customer/auth/verify-otp` with phone number, OTP, device ID, platform, and optional FCM token.
4. Backend verifies the OTP, creates or updates the customer, stores device/FCM token, and returns JWT access/refresh tokens.

Backend stores OTP hashes only. Plain OTP values are not stored.

### Admin Authentication

Admins use email/password. Backend verifies password hash and returns JWT access and refresh tokens.

### Vendor Authentication

Vendors use email/password. A vendor must be `APPROVED` before vendor panel APIs can be used.

## Global Response Format

Success:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

List:

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

Error:

```json
{
  "success": false,
  "message": "Validation failed",
  "errorCode": "VALIDATION_ERROR",
  "errors": []
}
```

## Local Setup

```bash
npm install
cp .env.example .env
docker compose -f docker/docker-compose.yml up -d postgres redis
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

## PostgreSQL Database And Grants

For local PostgreSQL, create a dedicated application user and database:

```bash
psql -U postgres -h localhost -p 5432
```

```sql
CREATE USER pawdigi_app WITH PASSWORD 'pawdigi_app_password';
CREATE DATABASE pawdigi OWNER pawdigi_app;
GRANT ALL PRIVILEGES ON DATABASE pawdigi TO pawdigi_app;
\c pawdigi
GRANT ALL ON SCHEMA public TO pawdigi_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO pawdigi_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO pawdigi_app;
```

Use this connection string in `.env`:

```env
DATABASE_URL=postgresql://pawdigi_app:pawdigi_app_password@localhost:5432/pawdigi?schema=public
```

After setting `DATABASE_URL`, run:

```bash
npm run db:ensure
npm run prisma:seed
```

## Automatic Table Creation

The project includes:

```bash
npm run db:ensure
```

This command runs `scripts/ensure-db.js`. It connects to PostgreSQL using `DATABASE_URL`, checks `information_schema.tables` for required Prisma tables, and only runs:

```bash
npx prisma db push --skip-generate
```

when one or more required tables are missing.

The command is automatically executed before:

```bash
npm run start
npm run start:dev
npm run start:prod
```

Docker startup also runs the same check before starting `node dist/main.js`.

## Docker

```bash
docker compose -f docker/docker-compose.yml up --build
```

## Tests

```bash
npm test
npm run test:e2e
```

## Database

Prisma schema is in:

```txt
prisma/schema.prisma
```

Seed script is in:

```txt
prisma/seed.ts
```

## ID Strategy

Application-created records use UUIDv7 IDs through:

```txt
src/common/utils/id.util.ts
src/core/database/prisma.service.ts
```

`PrismaService` assigns UUIDv7 IDs during top-level and nested `create`, `createMany`, and `upsert` operations when an `id` is not already supplied. Prisma schema UUID defaults remain as a database fallback for direct Prisma scripts or raw database writes.

## Background Jobs

| Queue | Purpose |
| --- | --- |
| `daily-reminder-check` | Sends reminder notifications and marks overdue reminders |
| `passport-cleanup` | Revokes expired passport share links |
| `notifications` | Sends queued push notifications |

## Security

Implemented:

- Helmet
- Express `x-powered-by` disabled
- Proxy-aware client IP handling for deployments behind a load balancer
- JSON body size limit of 256 KB and URL-encoded body size limit of 64 KB
- CORS configuration
- URI API versioning
- DTO validation
- Global rate limiting through Nest throttler
- Stricter throttling on OTP, login, registration, and refresh-token endpoints
- Customer JWT auth guard
- JWT auth guard
- Role guard
- Vendor approved guard
- Refresh token hashing
- Rate limiting
- Prisma exception filter
- Central HTTP exception filter
- Signed storage URLs
- Razorpay REST API order/refund integration
- Razorpay checkout signature verification
- Razorpay webhook signature verification when raw body and secret are configured

Recommended production edge protections:

- Put the API behind a managed WAF/CDN such as Cloudflare, AWS WAF, or an equivalent provider.
- Add edge rate limits per IP, ASN, country, and path for `/api/v1/customer/auth/request-otp`, `/api/v1/*/auth/login`, and `/api/v1/payments/webhook`.
- Enable provider-level DDoS protection and bot filtering before traffic reaches Node.js.
- Keep `CORS_ORIGINS` restricted to the deployed admin/vendor origins in production.
