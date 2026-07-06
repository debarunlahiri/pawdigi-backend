# Pet Passport APIs

Filtered customer endpoints from `pet-passports.md`.

## Get Pet Passport

| Field | Value |
| --- | --- |
| API name | Get Pet Passport |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid/passport` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or allowed GUARDIAN |

Path/query params:

```json
{
  "petId": "pet_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/pets/pet_uuid/passport" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "passport_uuid",
    "petId": "pet_uuid",
    "passportNo": "PD-1780000000000",
    "shareToken": "public_share_token",
    "shareExpires": "2026-07-12T10:00:00.000Z",
    "shareRevoked": false,
    "pdfDocumentId": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "pet": {
      "id": "pet_uuid",
      "name": "Bruno",
      "species": "DOG",
      "breed": "Labrador",
      "gender": "MALE",
      "dateOfBirth": "2022-01-01T00:00:00.000Z",
      "profileImageUrl": "https://cdn.example.com/bruno.webp"
    }
  }
}
```

## Generate Passport

| Field | Value |
| --- | --- |
| API name | Generate Passport |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid/passport/generate` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner |

Path/query params:

```json
{
  "petId": "pet_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/pets/pet_uuid/passport/generate" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "passport_uuid",
    "petId": "pet_uuid",
    "passportNo": "PD-1780000000000",
    "shareToken": "public_share_token",
    "shareExpires": "2026-07-12T10:00:00.000Z",
    "shareRevoked": false,
    "pdfDocumentId": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "pet": {
      "id": "pet_uuid",
      "name": "Bruno",
      "species": "DOG",
      "breed": "Labrador",
      "gender": "MALE",
      "dateOfBirth": "2022-01-01T00:00:00.000Z",
      "profileImageUrl": "https://cdn.example.com/bruno.webp"
    }
  }
}
```

## Share Passport

| Field | Value |
| --- | --- |
| API name | Share Passport |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid/passport/share` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner |

Path/query params:

```json
{
  "petId": "pet_uuid"
}
```

Request body:

```json
{
  "expiresInDays": 7
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/pets/pet_uuid/passport/share" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"expiresInDays":7}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "passport_uuid",
    "petId": "pet_uuid",
    "passportNo": "PD-1780000000000",
    "shareToken": "public_share_token",
    "shareExpires": "2026-07-12T10:00:00.000Z",
    "shareRevoked": false,
    "pdfDocumentId": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "pet": {
      "id": "pet_uuid",
      "name": "Bruno",
      "species": "DOG",
      "breed": "Labrador",
      "gender": "MALE",
      "dateOfBirth": "2022-01-01T00:00:00.000Z",
      "profileImageUrl": "https://cdn.example.com/bruno.webp"
    }
  }
}
```

## Revoke Passport Share

| Field | Value |
| --- | --- |
| API name | Revoke Passport Share |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/passport/share/passport_uuid/revoke` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner |

Path/query params:

```json
{
  "shareId": "passport_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/passport/share/passport_uuid/revoke" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "passport_uuid",
    "petId": "pet_uuid",
    "passportNo": "PD-1780000000000",
    "shareToken": "public_share_token",
    "shareExpires": "2026-07-12T10:00:00.000Z",
    "shareRevoked": true,
    "pdfDocumentId": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "pet": {
      "id": "pet_uuid",
      "name": "Bruno",
      "species": "DOG",
      "breed": "Labrador",
      "gender": "MALE",
      "dateOfBirth": "2022-01-01T00:00:00.000Z",
      "profileImageUrl": "https://cdn.example.com/bruno.webp"
    }
  }
}
```
