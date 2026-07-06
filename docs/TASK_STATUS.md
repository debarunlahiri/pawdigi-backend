# PawDigi Backend Task Status

Last updated: 2026-07-05

This file is the shared checklist for both the user and backend implementer. Keep it updated whenever a feature is completed, changed, blocked, or intentionally deferred.

## Status Legend

| Status | Meaning |
| --- | --- |
| `DONE` | Implemented and currently passing build/tests |
| `PARTIAL` | Usable base exists, but production work remains |
| `PENDING` | Not implemented yet |
| `BLOCKED` | Needs external credentials, business decision, or infrastructure |

## Verification Baseline

Latest verification completed:

```bash
npm run build
npm test -- --runInBand
node -c scripts/ensure-db.js
```

Current result:

| Check | Status | Notes |
| --- | --- | --- |
| TypeScript build | `DONE` | `npm run build` passes |
| Unit test harness | `DONE` | `npm test -- --runInBand` passes |
| DB ensure script syntax | `DONE` | `node -c scripts/ensure-db.js` passes |
| Real DB ensure execution | `BLOCKED` | Needs local `.env` with `DATABASE_URL` and running PostgreSQL |

## Completed Work

### Project Structure

| Task | Status | Owner | Notes |
| --- | --- | --- | --- |
| Create NestJS backend scaffold | `DONE` | Backend | TypeScript, Nest CLI, strict build config |
| Correct scalable folder structure | `DONE` | Backend | Features under `src/modules`, integrations under `src/integrations`, core under `src/core` |
| Keep Prisma outside `src` | `DONE` | Backend | `prisma/schema.prisma`, `prisma/seed.ts` |
| Add Docker setup | `DONE` | Backend | `docker/Dockerfile`, `docker/docker-compose.yml` |
| Add `.env.example` | `DONE` | Backend | Includes DB, JWT, Twilio, FCM, Redis, S3, Razorpay, CORS |
| Update `.gitignore` | `DONE` | Backend | Node, env, build, cache, Docker data, OS/editor files |

### Database

| Task | Status | Owner | Notes |
| --- | --- | --- | --- |
| Create Prisma schema | `DONE` | Backend | Users, pets, health records, commerce, payments, audit logs, refresh tokens |
| Add UUID primary keys | `DONE` | Backend | Models use UUID defaults |
| Add UUIDv7 application ID generation | `DONE` | Backend | PrismaService assigns UUIDv7 for top-level and nested app writes |
| Add indexes | `DONE` | Backend | Core lookup/index fields included |
| Add detailed OTP persistence | `DONE` | Backend | OTP code/hash, device, delivery, request, verification, failure, and attempt metadata stored |
| Add API request logs table | `DONE` | Backend | Stores method/path/status/duration/user/request metadata with sensitive input redaction |
| Add detailed operational commerce tables | `DONE` | Backend | Cart, order, payment, shipment, notification, passport, review, inventory, image, device, and refresh-token tables include lifecycle and audit metadata |
| Add seed script | `DONE` | Backend | Super admin, categories, sample approved vendor |
| Add auto table creation script | `DONE` | Backend | `scripts/ensure-db.js` checks tables and runs `prisma db push` when missing |
| Wire DB ensure into startup | `DONE` | Backend | `start`, `start:dev`, `start:prod`, Docker command |

### Auth and Security

| Task | Status | Owner | Notes |
| --- | --- | --- | --- |
| Customer Twilio OTP login | `DONE` | Backend | Requests OTP, verifies hashed OTP, creates local customer, stores device token, returns JWT |
| Admin email/password login | `DONE` | Backend | bcrypt + JWT + refresh token hash |
| Vendor register/login | `DONE` | Backend | Approval required for vendor APIs |
| JWT strategy and guard | `DONE` | Backend | Admin/vendor auth |
| Customer JWT auth guard | `DONE` | Backend | Customer mobile APIs use JWT after OTP verification |
| Role guard | `DONE` | Backend | Admin/vendor/super-admin route protection |
| Vendor approved guard | `DONE` | Backend | Vendor portal protection |
| Refresh token rotation | `DONE` | Backend | Refresh token sessions are revoked on refresh/logout |
| Helmet/CORS/rate limiting | `DONE` | Backend | Global app setup |
| Global validation pipe | `DONE` | Backend | whitelist, transform, forbid non-whitelisted |
| Exception filters | `DONE` | Backend | HTTP + Prisma filters |

### API Modules

| Module | Status | Owner | Notes |
| --- | --- | --- | --- |
| Auth | `DONE` | Backend | Customer, admin, vendor controllers separated |
| Users | `DONE` | Backend | Admin list/create/update/block/unblock |
| Customers | `DONE` | Backend | Customer profile, admin customer list/detail |
| Admins | `DONE` | Backend | Super-admin admin account management |
| Vendors | `DONE` | Backend | Profile, KYC, admin approve/reject/suspend |
| Pets | `DONE` | Backend | CRUD, owner-only delete, access service |
| Guardians | `DONE` | Backend | Invite, list invites, accept, update, revoke |
| Pet passports | `DONE` | Backend | Generate, share, revoke, public share lookup, basic PDF helper |
| Vaccinations | `DONE` | Backend | List/create/update/delete |
| Deworming | `DONE` | Backend | List/create/update/delete |
| Medical records | `DONE` | Backend | List/create/update/delete |
| Documents | `DONE` | Backend | Signed upload, confirm, signed view, delete |
| Reminders | `DONE` | Backend | CRUD-ish flow, complete/cancel, job support |
| Notifications | `DONE` | Backend | Device register/delete, notification list/read/read-all |
| Categories | `DONE` | Backend | Public list, admin CRUD |
| Products | `DONE` | Backend | Public list/detail, vendor CRUD, admin approve/reject |
| Inventory | `DONE` | Backend | Vendor stock update |
| Cart | `DONE` | Backend | Get/add/update/remove/clear |
| Orders | `DONE` | Backend | Create/list/detail/cancel, vendor status, admin list |
| Payments | `DONE` | Backend/User | Create/verify/webhook/refund implemented with Razorpay REST API and signature verification |
| Shipments | `DONE` | Backend | Vendor create/update, admin list |
| Reviews | `DONE` | Backend | Public product reviews, customer create/update, admin list |
| Reports | `DONE` | Backend | Admin user/order/vendor reports, vendor summary |
| Audit logs | `DONE` | Backend | List and service; wired to major admin actions |
| API request logs | `DONE` | Backend | Global DB logging plus admin list endpoint |
| Health | `DONE` | Backend | Health check endpoint |

### Jobs

| Task | Status | Owner | Notes |
| --- | --- | --- | --- |
| Reminder job queue | `DONE` | Backend | Sends due reminders, marks overdue |
| Notification job queue | `DONE` | Backend | Sends queued push notifications |
| Passport cleanup job | `DONE` | Backend | Revokes expired share links |
| Scheduler run logs | `DONE` | Backend | Logs registration/runs with status, duration, input/output, counts, BullMQ ids, and errors |
| Abandoned cart reminder job | `PENDING` | Backend | Optional future job |
| Retry/backoff tuning | `PENDING` | Backend/User | Needs operational policy |

### Documentation

| Task | Status | Owner | Notes |
| --- | --- | --- | --- |
| Project documentation | `DONE` | Backend | `docs/PROJECT_DOCUMENTATION.md` |
| API documentation index | `DONE` | Backend | `docs/API_DOCUMENTATION.md` |
| Module-wise API docs | `DONE` | Backend | `docs/api/*.md` |
| Task status tracker | `DONE` | Backend | This file |
| README links | `DONE` | Backend | Points to docs and API docs |

## Pending Work

### High Priority

| Task | Status | Owner | Reason | Next Action |
| --- | --- | --- | --- | --- |
| Add real Razorpay SDK/API integration | `DONE` | Backend | Uses Razorpay REST API for orders/refunds and HMAC verification for checkout signatures | Configure Razorpay credentials in `.env` before live use |
| Run DB ensure against real PostgreSQL | `BLOCKED` | User | No local `.env` exists in repo root | Create `.env` from `.env.example`, start Postgres, run `npm run db:ensure` |
| Create Prisma migration files | `PENDING` | User/Backend | Current auto-create uses `db push`; production usually needs migrations | Run `npm run prisma:migrate` after DB is available |
| Add integration/e2e tests for auth and core modules | `PENDING` | Backend | Only harness test exists | Add tests for auth, pets, orders, payments |
| Hide password hashes from API responses | `DONE` | Backend | Global response interceptor strips server-side hash fields from nested responses | Covered by focused interceptor tests |

### Medium Priority

| Task | Status | Owner | Reason | Next Action |
| --- | --- | --- | --- | --- |
| Add DTO Swagger decorators | `PENDING` | Backend | Swagger works but schemas can be richer | Add `@ApiProperty` to DTOs |
| Add request ID middleware | `PARTIAL` | Backend | DB API log stores request ID when upstream middleware/logger provides one | Add explicit request ID middleware and response header |
| Add audit logging to all admin actions | `PARTIAL` | Backend | Major actions covered, not every admin endpoint | Expand to categories, shipments, refunds, admin account changes |
| Add pagination to all list endpoints | `PARTIAL` | Backend | Some lists paginate, many return all rows | Standardize list services with `PaginationQueryDto` |
| Add soft-delete consistency checks | `PARTIAL` | Backend | Core models have `deletedAt`; not every query filters it | Review all list/detail queries |
| Add permission guard for guardian-specific actions | `PARTIAL` | Backend | PetAccessService covers core health access | Add route-level permission metadata where useful |
| Add file metadata confirmation fields | `PARTIAL` | Backend | Confirm upload accepts storage key only | Extend DTO to capture file metadata after upload |
| Add notification preferences | `PENDING` | User/Backend | Needed to decide guardian reminder fanout | Define preference rules and schema |

### Low Priority

| Task | Status | Owner | Reason | Next Action |
| --- | --- | --- | --- | --- |
| Add abandoned cart reminder job | `PENDING` | Backend | Optional in original brief | Implement after cart business policy is finalized |
| Add product search indexing | `PENDING` | Backend | Current search is database filter only | Consider Postgres full-text search or external search later |
| Add PDF storage flow for passports | `PARTIAL` | Backend | PDF buffer helper exists but not stored in S3 yet | Generate PDF, upload to storage, connect document |
| Add SMS provider implementation | `DONE` | Backend | Twilio SMS service is implemented with dev fallback | Configure Twilio credentials in `.env` |
| Add CI workflow | `PENDING` | User/Backend | No GitHub Actions or CI file yet | Add install/build/test pipeline |

## External Inputs Needed From User

| Input | Needed For |
| --- | --- |
| Real PostgreSQL `DATABASE_URL` | Running `db:ensure`, migrations, seed |
| Twilio account SID/auth token/from phone | Customer mobile SMS OTP |
| FCM Firebase Admin credentials | Push notification delivery in non-local environments |
| S3 credentials and bucket | Signed upload/view URLs |
| Razorpay key ID/secret/webhook secret | Real payments |
| Admin panel origin | Production CORS |
| Vendor panel origin | Production CORS |
| Initial super-admin email/password | Seed script |

## Commands For User

Initial local run:

```bash
cp .env.example .env
docker compose -f docker/docker-compose.yml up -d postgres redis
npm install
npm run prisma:generate
npm run db:ensure
npm run prisma:seed
npm run start:dev
```

Validation:

```bash
npm run build
npm test -- --runInBand
```

Documentation:

```txt
docs/PROJECT_DOCUMENTATION.md
docs/API_DOCUMENTATION.md
docs/api/
```

## Implementation Notes

- Do not flatten modules back into `src/`.
- Keep feature code under `src/modules`.
- Keep external provider code under `src/integrations`.
- Do not add customer website, blog, CMS, contact form, or customer web dashboard modules.
- Before marking a task done, run `npm run build` and `npm test -- --runInBand`.
- Keep this file updated after every meaningful change.
