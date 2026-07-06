# Admin Settings APIs

Platform configuration endpoints (SUPER_ADMIN only).

## Admin Settings List

| Field | Value |
| --- | --- |
| API name | Admin Settings List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/settings` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | SUPER_ADMIN |

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/settings" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "nodeEnv": "development",
    "port": 9800,
    "apiPrefix": "api",
    "rateLimits": {
      "globalPerMinute": 1000,
      "authPerMinute": 100,
      "otpPer10Minutes": 100
    },
    "origins": {
      "adminPanel": "http://localhost:3001",
      "vendorPanel": "http://localhost:3002",
      "cors": "http://localhost:3001,http://localhost:3002"
    }
  }
}
```

## Admin Update Rate Limits

| Field | Value |
| --- | --- |
| API name | Admin Update Rate Limits |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/settings/rate-limits` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | SUPER_ADMIN |

Request body:

```json
{
  "globalPerMinute": 2000,
  "authPerMinute": 200,
  "otpPer10Minutes": 200
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/settings/rate-limits" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"globalPerMinute":2000,"authPerMinute":200,"otpPer10Minutes":200}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "nodeEnv": "development",
    "rateLimits": {
      "globalPerMinute": 2000,
      "authPerMinute": 200,
      "otpPer10Minutes": 200
    }
  }
}
```
