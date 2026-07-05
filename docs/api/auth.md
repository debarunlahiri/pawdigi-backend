## Authentication APIs

### Customer Request OTP

| Field | Value |
| --- | --- |
| API name | Customer Request OTP |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/customer/auth/request-otp` |
| Auth | None |

Request body:

```json
{
  "phoneNumber": "+919999999999",
  "deviceId": "ios-device-001"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/customer/auth/request-otp" \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+919999999999","deviceId":"ios-device-001"}'
```

Response:

```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": {
    "phoneNumber": "+919999999999",
    "deviceId": "ios-device-001",
    "expiresInMinutes": 5
  }
}
```

### Customer Verify OTP

| Field | Value |
| --- | --- |
| API name | Customer Verify OTP |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/customer/auth/verify-otp` |
| Auth | None |

Request body:

```json
{
  "phoneNumber": "+919999999999",
  "otp": "123456",
  "deviceId": "ios-device-001",
  "fcmToken": "fcm-token",
  "platform": "ios"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/customer/auth/verify-otp" \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+919999999999","otp":"123456","deviceId":"ios-device-001","fcmToken":"fcm-token","platform":"ios"}'
```

Response:

```json
{
  "success": true,
  "message": "Customer authenticated",
  "data": {
    "customer": {
      "id": "user_uuid",
      "email": null,
      "phoneNumber": "+919999999999",
      "passwordHash": null,
      "role": "CUSTOMER",
      "status": "ACTIVE",
      "lastLoginAt": "2026-07-05T10:00:00.000Z",
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z",
      "deletedAt": null,
      "customerProfile": {
        "id": "customer_profile_uuid",
        "userId": "user_uuid",
        "name": null,
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z"
      }
    },
    "accessToken": "customer-jwt-access-token",
    "refreshToken": "customer-jwt-refresh-token",
    "session": {
      "provider": "twilio_otp"
    }
  }
}
```

### Admin Login

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

### Admin Refresh Token

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

### Admin Logout

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

### Admin Me

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

### Vendor Register

| Field | Value |
| --- | --- |
| API name | Vendor Register |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/vendor/auth/register` |
| Auth | None |

Request body:

```json
{
  "email": "vendor@example.com",
  "password": "Vendor123!",
  "businessName": "Happy Paws Store",
  "contactPerson": "Amit",
  "phoneNumber": "+919999999998"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/vendor/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"vendor@example.com","password":"Vendor123!","businessName":"Happy Paws Store","contactPerson":"Amit","phoneNumber":"+919999999998"}'
```

Response:

```json
{
  "success": true,
  "message": "Vendor registered and pending approval",
  "data": {
    "user": {
      "id": "vendor_user_uuid",
      "email": "vendor@example.com",
      "phoneNumber": null,
      "passwordHash": "$2b$12$redacted",
      "role": "VENDOR",
      "status": "ACTIVE",
      "lastLoginAt": null,
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z",
      "deletedAt": null,
      "vendorProfile": {
        "id": "vendor_uuid",
        "userId": "vendor_user_uuid",
        "businessName": "Happy Paws Store",
        "contactPerson": "Amit",
        "email": "vendor@example.com",
        "phoneNumber": "+919999999998",
        "gstNumber": null,
        "panNumber": null,
        "address": null,
        "city": null,
        "state": null,
        "pincode": null,
        "status": "PENDING",
        "rejectionReason": null,
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z",
        "deletedAt": null
      }
    }
  }
}
```

### Vendor Login

| Field | Value |
| --- | --- |
| API name | Vendor Login |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/vendor/auth/login` |
| Auth | Public |
| Roles | VENDOR |

Path/query params:

```json
{}
```

Request body:

```json
{
  "email": "vendor@example.com",
  "password": "Vendor123!"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/vendor/auth/login" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"email":"vendor@example.com","password":"Vendor123!"}'
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "vendor_user_uuid",
      "email": "vendor@example.com",
      "phoneNumber": "+919999999998",
      "role": "VENDOR",
      "status": "ACTIVE",
      "lastLoginAt": "2026-07-05T10:00:00.000Z",
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z",
      "deletedAt": null,
      "vendorProfile": {
        "id": "vendor_uuid",
        "userId": "vendor_user_uuid",
        "businessName": "Happy Paws Store",
        "contactPerson": "Amit",
        "email": "vendor@example.com",
        "phoneNumber": "+919999999998",
        "gstNumber": "27ABCDE1234F1Z5",
        "panNumber": "ABCDE1234F",
        "address": "Salt Lake",
        "city": "Kolkata",
        "state": "WB",
        "pincode": "700091",
        "status": "APPROVED",
        "rejectionReason": null,
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z",
        "deletedAt": null
      }
    },
    "accessToken": "vendor-jwt-access-token",
    "refreshToken": "vendor-jwt-refresh-token"
  }
}
```

### Vendor Refresh Token

| Field | Value |
| --- | --- |
| API name | Vendor Refresh Token |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/vendor/auth/refresh-token` |
| Auth | Public |
| Roles | VENDOR |

Path/query params:

```json
{}
```

Request body:

```json
{
  "refreshToken": "vendor-jwt-refresh-token"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/vendor/auth/refresh-token" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"vendor-jwt-refresh-token"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "accessToken": "new-vendor-jwt-access-token",
    "refreshToken": "new-vendor-jwt-refresh-token"
  }
}
```

### Vendor Logout

| Field | Value |
| --- | --- |
| API name | Vendor Logout |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/vendor/auth/logout` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR |

Path/query params:

```json
{}
```

Request body:

```json
{
  "refreshToken": "vendor-jwt-refresh-token"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/vendor/auth/logout" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"vendor-jwt-refresh-token"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "loggedOut": true
  }
}
```

### Vendor Me

| Field | Value |
| --- | --- |
| API name | Vendor Me |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/vendor/auth/me` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR |

Path/query params:

```json
{}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/vendor/auth/me" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "vendor_user_uuid",
    "email": "vendor@example.com",
    "phoneNumber": "+919999999998",
    "role": "VENDOR",
    "status": "ACTIVE",
    "lastLoginAt": "2026-07-05T10:00:00.000Z",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null,
    "vendorProfile": {
      "id": "vendor_uuid",
      "userId": "vendor_user_uuid",
      "businessName": "Happy Paws Store",
      "contactPerson": "Amit",
      "email": "vendor@example.com",
      "phoneNumber": "+919999999998",
      "gstNumber": "27ABCDE1234F1Z5",
      "panNumber": "ABCDE1234F",
      "address": "Salt Lake",
      "city": "Kolkata",
      "state": "WB",
      "pincode": "700091",
      "status": "APPROVED",
      "rejectionReason": null,
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z",
      "deletedAt": null
    }
  }
}
```

