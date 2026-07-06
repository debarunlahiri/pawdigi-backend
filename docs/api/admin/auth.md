# Authentication APIs

Filtered admin endpoints from `auth.md`.

## Admin Login

| Field | Value |
| --- | --- |
| API name | Admin Login |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/admin/auth/login` |
| Auth | None |

Request body:

```json
{
  "email": "admin@example.com",
  "password": "Password123!"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/admin/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Password123!"}'
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "admin_user_uuid",
      "email": "admin@example.com",
      "phoneNumber": null,
      "passwordHash": "$2b$12$redacted",
      "role": "ADMIN",
      "status": "ACTIVE",
      "lastLoginAt": "2026-07-05T10:00:00.000Z",
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z",
      "deletedAt": null
    },
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

## Admin Refresh Token

| Field | Value |
| --- | --- |
| API name | Admin Refresh Token |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/admin/auth/refresh-token` |
| Auth | None |

Request body:

```json
{
  "refreshToken": "jwt-refresh-token"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/admin/auth/refresh-token" \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"jwt-refresh-token"}'
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "admin_user_uuid",
      "email": "admin@example.com",
      "role": "ADMIN"
    },
    "accessToken": "new-jwt-access-token",
    "refreshToken": "new-jwt-refresh-token"
  }
}
```

## Admin Logout

| Field | Value |
| --- | --- |
| API name | Admin Logout |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/admin/auth/logout` |
| Auth | `Bearer ADMIN_ACCESS_TOKEN` |

Request body:

```json
{}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/admin/auth/logout" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN"
```

Response:

```json
{
  "success": true,
  "message": "Logged out",
  "data": null
}
```

## Admin Me

| Field | Value |
| --- | --- |
| API name | Admin Me |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/auth/me` |
| Auth | `Bearer ADMIN_ACCESS_TOKEN` |

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/auth/me" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "admin_user_uuid",
      "email": "admin@example.com",
    "phoneNumber": null,
    "passwordHash": "$2b$12$redacted",
    "role": "ADMIN",
    "status": "ACTIVE",
    "lastLoginAt": "2026-07-05T10:00:00.000Z",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null,
    "adminProfile": {
      "id": "admin_profile_uuid",
      "userId": "admin_user_uuid",
      "name": "Admin",
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z"
    }
  }
}
```
