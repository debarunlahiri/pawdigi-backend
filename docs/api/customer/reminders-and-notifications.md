# Reminder and Notification APIs

Filtered customer endpoints from `reminders-and-notifications.md`.

## List Reminders

| Field | Value |
| --- | --- |
| API name | List Reminders |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/reminders?page=1&limit=20` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{
  "page": 1,
  "limit": 20
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/reminders?page=1&limit=20" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "items": [
      {
        "id": "reminder_uuid",
        "petId": "pet_uuid",
        "userId": "019f30f4-4dd7-7000-9000-000000000001",
        "type": "VACCINATION",
        "title": "Rabies booster",
        "description": "Annual vaccine due",
        "dueDate": "2027-07-01T00:00:00.000Z",
        "repeatType": "YEARLY",
        "status": "PENDING",
        "lastSentAt": null,
        "completedAt": null,
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z"
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

## Create Reminder

| Field | Value |
| --- | --- |
| API name | Create Reminder |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/reminders` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{}
```

Request body:

```json
{
  "petId": "pet_uuid",
  "type": "VACCINATION",
  "title": "Rabies booster",
  "description": "Annual vaccine due",
  "dueDate": "2027-07-01",
  "repeatType": "YEARLY"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/reminders" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"petId":"pet_uuid","type":"VACCINATION","title":"Rabies booster","description":"Annual vaccine due","dueDate":"2027-07-01","repeatType":"YEARLY"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "reminder_uuid",
    "petId": "pet_uuid",
    "userId": "019f30f4-4dd7-7000-9000-000000000001",
    "type": "VACCINATION",
    "title": "Rabies booster",
    "description": "Annual vaccine due",
    "dueDate": "2027-07-01T00:00:00.000Z",
    "repeatType": "YEARLY",
    "status": "PENDING",
    "lastSentAt": null,
    "completedAt": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

## Update Reminder

| Field | Value |
| --- | --- |
| API name | Update Reminder |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/reminders/reminder_uuid` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER reminder owner |

Path/query params:

```json
{
  "reminderId": "reminder_uuid"
}
```

Request body:

```json
{
  "title": "Rabies booster updated",
  "dueDate": "2027-07-02"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/reminders/reminder_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"title":"Rabies booster updated","dueDate":"2027-07-02"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "reminder_uuid",
    "petId": "pet_uuid",
    "userId": "019f30f4-4dd7-7000-9000-000000000001",
    "type": "VACCINATION",
    "title": "Rabies booster updated",
    "description": "Annual vaccine due",
    "dueDate": "2027-07-02T00:00:00.000Z",
    "repeatType": "YEARLY",
    "status": "PENDING",
    "lastSentAt": null,
    "completedAt": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

## Complete Reminder

| Field | Value |
| --- | --- |
| API name | Complete Reminder |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/reminders/reminder_uuid/complete` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER reminder owner |

Path/query params:

```json
{
  "reminderId": "reminder_uuid"
}
```

Request body:

```json
{
  "completedAt": "2026-07-05T10:00:00.000Z"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/reminders/reminder_uuid/complete" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"completedAt":"2026-07-05T10:00:00.000Z"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "reminder_uuid",
    "petId": "pet_uuid",
    "userId": "019f30f4-4dd7-7000-9000-000000000001",
    "type": "VACCINATION",
    "title": "Rabies booster",
    "description": "Annual vaccine due",
    "dueDate": "2027-07-01T00:00:00.000Z",
    "repeatType": "YEARLY",
    "status": "COMPLETED",
    "lastSentAt": null,
    "completedAt": "2026-07-05T10:00:00.000Z",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

## Cancel Reminder

| Field | Value |
| --- | --- |
| API name | Cancel Reminder |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/reminders/reminder_uuid` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER reminder owner |

Path/query params:

```json
{
  "reminderId": "reminder_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X DELETE "http://localhost:3000/api/v1/reminders/reminder_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "reminder_uuid",
    "status": "CANCELLED"
  }
}
```

## Register Device

| Field | Value |
| --- | --- |
| API name | Register Device |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/devices/register` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{}
```

Request body:

```json
{
  "deviceId": "ios-device-001",
  "fcmToken": "fcm-token",
  "platform": "ios"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/devices/register" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"deviceId":"ios-device-001","fcmToken":"fcm-token","platform":"ios"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "device_token_uuid",
    "userId": "019f30f4-4dd7-7000-9000-000000000001",
    "deviceId": "ios-device-001",
    "fcmToken": "fcm-token",
    "platform": "ios",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

## Delete Device

| Field | Value |
| --- | --- |
| API name | Delete Device |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/devices/ios-device-001` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{
  "deviceId": "ios-device-001"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X DELETE "http://localhost:3000/api/v1/devices/ios-device-001" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "deviceId": "ios-device-001",
    "deleted": true
  }
}
```

## List Notifications

| Field | Value |
| --- | --- |
| API name | List Notifications |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/notifications?page=1&limit=20` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{
  "page": 1,
  "limit": 20
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/notifications?page=1&limit=20" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "items": [
      {
        "id": "notification_uuid",
        "userId": "019f30f4-4dd7-7000-9000-000000000001",
        "title": "Rabies booster",
        "body": "Annual vaccine due tomorrow",
        "type": "REMINDER",
        "data": {
          "reminderId": "reminder_uuid"
        },
        "isRead": false,
        "readAt": null,
        "createdAt": "2026-07-05T10:00:00.000Z"
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

## Mark Notification Read

| Field | Value |
| --- | --- |
| API name | Mark Notification Read |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/notifications/notification_uuid/read` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{
  "id": "notification_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/notifications/notification_uuid/read" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "notification_uuid",
    "userId": "019f30f4-4dd7-7000-9000-000000000001",
    "title": "Rabies booster",
    "body": "Annual vaccine due tomorrow",
    "type": "REMINDER",
    "data": {
      "reminderId": "reminder_uuid"
    },
    "isRead": true,
    "readAt": "2026-07-05T10:00:00.000Z",
    "createdAt": "2026-07-05T10:00:00.000Z"
  }
}
```

## Mark All Notifications Read

| Field | Value |
| --- | --- |
| API name | Mark All Notifications Read |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/notifications/read-all` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

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
curl -X PATCH "http://localhost:3000/api/v1/notifications/read-all" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "updatedCount": 5
  }
}
```
