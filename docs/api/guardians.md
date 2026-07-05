# Guardian APIs

### Invite Guardian

| Field | Value |
| --- | --- |
| API name | Invite Guardian |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid/guardians/invite` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER pet owner |

Path/query params:

```json
{
  "petId": "pet_uuid"
}
```

Request body:

```json
{
  "email": "guardian@example.com",
  "phoneNumber": "+919999999997",
  "permission": "FULL_ACCESS"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/pets/pet_uuid/guardians/invite" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"email":"guardian@example.com","phoneNumber":"+919999999997","permission":"FULL_ACCESS"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "guardian_uuid",
    "petId": "pet_uuid",
    "guardianUserId": "guardian_user_uuid",
    "inviteEmail": "guardian@example.com",
    "invitePhone": "+919999999997",
    "inviteToken": "invite_token",
    "permission": "FULL_ACCESS",
    "acceptedAt": null,
    "revokedAt": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

### List Guardian Invitations

| Field | Value |
| --- | --- |
| API name | List Guardian Invitations |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/guardian/invitations` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER invited as guardian |

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
curl -X GET "http://localhost:3000/api/v1/guardian/invitations" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": [
    {
      "id": "guardian_uuid",
      "petId": "pet_uuid",
      "guardianUserId": "guardian_user_uuid",
      "inviteEmail": "guardian@example.com",
      "invitePhone": "+919999999997",
      "inviteToken": "invite_token",
      "permission": "FULL_ACCESS",
      "acceptedAt": null,
      "revokedAt": null,
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z"
    }
  ]
}
```

### Accept Guardian Invitation

| Field | Value |
| --- | --- |
| API name | Accept Guardian Invitation |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/guardian/invitations/guardian_uuid/accept` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER invited as guardian |

Path/query params:

```json
{
  "inviteId": "guardian_uuid"
}
```

Request body:

```json
{
  "inviteToken": "invite_token"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/guardian/invitations/guardian_uuid/accept" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"inviteToken":"invite_token"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "guardian_uuid",
    "petId": "pet_uuid",
    "guardianUserId": "guardian_user_uuid",
    "inviteEmail": "guardian@example.com",
    "invitePhone": "+919999999997",
    "inviteToken": "invite_token",
    "permission": "FULL_ACCESS",
    "acceptedAt": "2026-07-05T10:00:00.000Z",
    "revokedAt": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

### Update Guardian Permission

| Field | Value |
| --- | --- |
| API name | Update Guardian Permission |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid/guardians/guardian_uuid` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER pet owner |

Path/query params:

```json
{
  "petId": "pet_uuid",
  "guardianId": "guardian_uuid"
}
```

Request body:

```json
{
  "permission": "VIEW_ONLY"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/pets/pet_uuid/guardians/guardian_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"permission":"VIEW_ONLY"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "guardian_uuid",
    "petId": "pet_uuid",
    "guardianUserId": "guardian_user_uuid",
    "inviteEmail": "guardian@example.com",
    "invitePhone": "+919999999997",
    "inviteToken": "invite_token",
    "permission": "VIEW_ONLY",
    "acceptedAt": null,
    "revokedAt": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

### Revoke Guardian

| Field | Value |
| --- | --- |
| API name | Revoke Guardian |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid/guardians/guardian_uuid` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER pet owner |

Path/query params:

```json
{
  "petId": "pet_uuid",
  "guardianId": "guardian_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X DELETE "http://localhost:3000/api/v1/pets/pet_uuid/guardians/guardian_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "guardian_uuid",
    "revokedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

