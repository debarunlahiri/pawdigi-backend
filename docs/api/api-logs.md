# API Logs

API request logs are persisted automatically for every request handled by the global request logging interceptor.

Sensitive request fields such as passwords, OTP input, tokens, FCM tokens, authorization headers, and secrets are redacted before storage. OTP records keep the generated OTP details separately in `OtpVerification`.

### List API Request Logs

| Field | Value |
| --- | --- |
| API name | List API Request Logs |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/api-logs` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

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
curl -X GET "http://localhost:3000/api/v1/admin/api-logs" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": [
    {
      "id": "api_log_uuid",
      "requestId": "request-id",
      "userId": "user_uuid",
      "userRole": "ADMIN",
      "method": "GET",
      "path": "/api/v1/admin/dashboard",
      "route": "/dashboard",
      "query": {},
      "body": {},
      "params": {},
      "statusCode": 200,
      "status": "SUCCESS",
      "errorName": null,
      "errorMessage": null,
      "durationMs": 12,
      "ipAddress": "::1",
      "userAgent": "curl/8.0.0",
      "referer": null,
      "contentLength": null,
      "responseLength": null,
      "createdAt": "2026-07-05T10:00:00.000Z",
      "user": {
        "id": "user_uuid",
        "email": "admin@example.com",
        "phoneNumber": null,
        "role": "ADMIN",
        "status": "ACTIVE"
      }
    }
  ]
}
```
