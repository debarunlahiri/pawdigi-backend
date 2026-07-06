# Authentication APIs

Filtered customer endpoints from `auth.md`.

## Customer Request OTP

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

## Customer Verify OTP

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
