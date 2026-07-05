# PawDigi Backend

Scalable NestJS modular monolith for the PawDigi React Native app, Next.js admin panel, and Next.js vendor portal.

## Architecture

Business features live in `src/modules`, external providers live in `src/integrations`, shared technical utilities live in `src/common`, and app-level infrastructure lives in `src/core`.

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
  integrations/
    firebase/
    storage/
    payment/
    sms/
  jobs/
  modules/
```

No customer website, blog, contact form, CMS, or customer web dashboard modules are included.

## Documentation

- Project documentation: [docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md)
- API documentation index: [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)
- Module-wise API docs folder: [docs/api](docs/api)
- Completed and pending task tracker: [docs/TASK_STATUS.md](docs/TASK_STATUS.md)

## Setup

```bash
npm install
cp .env.example .env
docker compose -f docker/docker-compose.yml up -d postgres redis
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

`npm run start`, `npm run start:dev`, and `npm run start:prod` run `npm run db:ensure` first. That script checks whether required PostgreSQL tables exist and runs `prisma db push --skip-generate` when tables are missing.

### PostgreSQL Database And Grants

For a local PostgreSQL instance, create an app user and database before running Prisma:

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

Then set:

```env
DATABASE_URL=postgresql://pawdigi_app:pawdigi_app_password@localhost:5432/pawdigi?schema=public
```

Swagger is available at `http://localhost:3000/api/docs`.

## Authentication

Customer mobile login uses backend-managed Twilio SMS OTP. The mobile app calls `POST /api/v1/customer/auth/request-otp`, receives the OTP by SMS, then calls `POST /api/v1/customer/auth/verify-otp`. The backend verifies the OTP, creates or updates the local customer, stores the device/FCM token, and returns customer JWT access/refresh tokens.

Admin and vendor login use backend email/password auth with bcrypt, JWT access tokens, refresh token rotation, and hashed refresh token storage. Vendor panel access is guarded by approved vendor status.

## API Versioning

URI versioning is enabled globally with NestJS `VersioningType.URI`. Controllers declare `version: '1'`, producing routes under `/api/v1`.

## ID Strategy

Application writes assign UUIDv7 IDs through `PrismaService`. Prisma schema UUID defaults remain as a fallback for direct scripts or raw writes.

## Docker

```bash
docker compose -f docker/docker-compose.yml up --build
```

The API service runs Prisma migrations before starting.

## Tests

```bash
npm test
npm run test:e2e
```

## Deployment Notes

Use production secrets for JWT, Twilio SMS OTP service, PostgreSQL, Redis, S3-compatible storage, Razorpay, and panel origins. Do not use wildcard CORS in production.
