# Admin Pet Passport APIs

Admin endpoints for managing pet passports.

## Admin Pet Passport List

| Field | Value |
| --- | --- |
| API name | Admin Pet Passport List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/pet-passports?page=1&limit=20` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "page": 1,
  "limit": 20,
  "search": "Bruno",
  "status": "ACTIVE"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/pet-passports?page=1&limit=20" \
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
        "id": "passport_uuid",
        "petId": "pet_uuid",
        "passportNo": "PD-1699999999999",
        "status": "ACTIVE",
        "issuedAt": "2026-07-05T10:00:00.000Z",
        "shareRevoked": false,
        "viewCount": 0,
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z",
        "pet": {
          "id": "pet_uuid",
          "name": "Bruno",
          "owner": {
            "id": "customer_user_uuid",
            "phoneNumber": "+919999999999",
            "customerProfile": { "name": "Deb" }
          }
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

## Admin Pet Passport Detail

| Field | Value |
| --- | --- |
| API name | Admin Pet Passport Detail |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/pet-passports/passport_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{ "id": "passport_uuid" }
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/pet-passports/passport_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": {
    "id": "passport_uuid",
    "petId": "pet_uuid",
    "passportNo": "PD-1699999999999",
    "status": "ACTIVE",
    "issuedAt": "2026-07-05T10:00:00.000Z",
    "shareRevoked": false,
    "viewCount": 0,
    "pet": {
      "id": "pet_uuid",
      "name": "Bruno",
      "species": "DOG",
      "owner": { "id": "customer_user_uuid", "phoneNumber": "+919999999999" },
      "vaccinations": [],
      "deworming": []
    }
  }
}
```

## Admin Generate Passport

| Field | Value |
| --- | --- |
| API name | Admin Generate Passport |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/admin/pet-passports/pet_uuid/generate` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{ "petId": "pet_uuid" }
```

Request body:

```json
{}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/admin/pet-passports/pet_uuid/generate" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Passport generated successfully",
  "data": {
    "id": "passport_uuid",
    "petId": "pet_uuid",
    "passportNo": "PD-1699999999999",
    "status": "ACTIVE"
  }
}
```

## Admin Revoke Passport

| Field | Value |
| --- | --- |
| API name | Admin Revoke Passport |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/pet-passports/passport_uuid/revoke` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{ "id": "passport_uuid" }
```

Request body:

```json
{}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/pet-passports/passport_uuid/revoke" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Passport share revoked successfully",
  "data": {
    "id": "passport_uuid",
    "shareRevoked": true,
    "shareRevokedAt": "2026-07-05T10:00:00.000Z",
    "shareRevokedReason": "ADMIN_REVOKE"
  }
}
```
