# Admin Notification APIs

Admin endpoints for listing and sending notifications.

## Admin Notification List

| Field | Value |
| --- | --- |
| API name | Admin Notification List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/notifications?page=1&limit=20` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "page": 1,
  "limit": 20,
  "status": "FAILED"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/notifications?page=1&limit=20" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": {
    "items": [
      {
        "id": "notification_uuid",
        "userId": "customer_user_uuid",
        "title": "Welcome",
        "body": "Thanks for joining PawDigi",
        "status": "SENT",
        "channel": "PUSH",
        "createdAt": "2026-07-05T10:00:00.000Z",
        "user": {
          "id": "customer_user_uuid",
          "phoneNumber": "+919999999999",
          "customerProfile": { "name": "Deb" }
        }
      }
    ],
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

## Admin Notification Detail

| Field | Value |
| --- | --- |
| API name | Admin Notification Detail |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/notifications/notification_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/notifications/notification_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

## Admin Send Notification

| Field | Value |
| --- | --- |
| API name | Admin Send Notification |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/admin/notifications` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Request body:

```json
{
  "userId": "customer_user_uuid",
  "title": "Offer Alert",
  "body": "New discounts are live!",
  "data": "{\"offerId\":\"offer_1\"}",
  "type": "MARKETING",
  "priority": "HIGH"
}
```

For broadcast, omit `userId` and use `target`:

```json
{
  "target": "ALL",
  "title": "Maintenance",
  "body": "App will be down for maintenance"
}
```

`target` can be `CUSTOMER`, `VENDOR`, `ADMIN`, or `ALL`.

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/admin/notifications" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"userId":"customer_user_uuid","title":"Offer Alert","body":"New discounts are live!"}'
```

Response:

```json
{
  "success": true,
  "message": "Notification sent successfully",
  "data": {
    "id": "notification_uuid",
    "userId": "customer_user_uuid",
    "title": "Offer Alert",
    "status": "QUEUED"
  }
}
```

## Admin Retry Notification

| Field | Value |
| --- | --- |
| API name | Admin Retry Notification |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/admin/notifications/notification_uuid/retry` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/admin/notifications/notification_uuid/retry" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Notification retried successfully",
  "data": {
    "id": "notification_uuid",
    "status": "QUEUED"
  }
}
```
