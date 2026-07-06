# Pet Passport APIs

Filtered other endpoints from `pet-passports.md`.

## Public Passport

| Field | Value |
| --- | --- |
| API name | Public Passport |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/public/passport/public_share_token` |
| Auth | Public |
| Roles | Public with active share token |

Path/query params:

```json
{
  "shareToken": "public_share_token"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/public/passport/public_share_token" \
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
