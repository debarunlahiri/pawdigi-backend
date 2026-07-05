# Customer and Pet APIs

### Get Customer Profile

| Field | Value |
| --- | --- |
| API name | Get Customer Profile |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/customers/me` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
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
curl -X GET "http://localhost:3000/api/v1/customers/me" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "customer_profile_uuid",
    "userId": "019f30f4-4dd7-7000-9000-000000000001",
    "name": "Deb",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "user": {
      "id": "019f30f4-4dd7-7000-9000-000000000001",
      "email": null,
      "phoneNumber": "+919999999999",
      "passwordHash": null,
      "role": "CUSTOMER",
      "status": "ACTIVE",
      "lastLoginAt": "2026-07-05T10:00:00.000Z",
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z",
      "deletedAt": null
    }
  }
}
```

### Update Customer Profile

| Field | Value |
| --- | --- |
| API name | Update Customer Profile |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/customers/me` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{}
```

Request body:

```json
{"name":"Deb"}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/customers/me" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"name":"Deb"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "customer_profile_uuid",
    "userId": "019f30f4-4dd7-7000-9000-000000000001",
    "name": "Deb",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:10:00.000Z"
  }
}
```

### List Pets

| Field | Value |
| --- | --- |
| API name | List Pets |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/pets?page=1&limit=20` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER or GUARDIAN |

Path/query params:

```json
{"page":1,"limit":20,"search":"Bruno","sortBy":"createdAt","sortOrder":"desc"}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/pets?page=1&limit=20" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": [
    {
      "id": "pet_uuid",
      "ownerId": "019f30f4-4dd7-7000-9000-000000000001",
      "name": "Bruno",
      "species": "DOG",
      "breed": "Labrador",
      "gender": "MALE",
      "dateOfBirth": "2022-01-01T00:00:00.000Z",
      "weight": "24.50",
      "color": "Golden",
      "microchipNumber": "MC123456",
      "profileImageUrl": null,
      "passportNumber": null,
      "isActive": true,
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z",
      "deletedAt": null
    }
  ],
  "meta": {"page":1,"limit":20,"total":1,"totalPages":1}
}
```

### Create Pet

| Field | Value |
| --- | --- |
| API name | Create Pet |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/pets` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{}
```

Request body:

```json
{"name":"Bruno","species":"DOG","breed":"Labrador","gender":"MALE","dateOfBirth":"2022-01-01","weight":24.5,"color":"Golden","microchipNumber":"MC123456"}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/pets" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"name":"Bruno","species":"DOG","breed":"Labrador","gender":"MALE","dateOfBirth":"2022-01-01","weight":24.5,"color":"Golden","microchipNumber":"MC123456"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "pet_uuid",
    "ownerId": "019f30f4-4dd7-7000-9000-000000000001",
    "name": "Bruno",
    "species": "DOG",
    "breed": "Labrador",
    "gender": "MALE",
    "dateOfBirth": "2022-01-01T00:00:00.000Z",
    "weight": "24.50",
    "color": "Golden",
    "microchipNumber": "MC123456",
    "profileImageUrl": null,
    "passportNumber": "PD-1780000000000",
    "isActive": true,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Get Pet

| Field | Value |
| --- | --- |
| API name | Get Pet |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER or allowed GUARDIAN |

Path/query params:

```json
{"petId":"pet_uuid"}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/pets/pet_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "pet_uuid",
    "ownerId": "019f30f4-4dd7-7000-9000-000000000001",
    "name": "Bruno",
    "species": "DOG",
    "breed": "Labrador",
    "gender": "MALE",
    "dateOfBirth": "2022-01-01T00:00:00.000Z",
    "weight": "24.50",
    "color": "Golden",
    "microchipNumber": "MC123456",
    "profileImageUrl": null,
    "passportNumber": "PD-1780000000000",
    "isActive": true,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Update Pet

| Field | Value |
| --- | --- |
| API name | Update Pet |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner |

Path/query params:

```json
{"petId":"pet_uuid"}
```

Request body:

```json
{"name":"Bruno Updated","weight":25.1}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/pets/pet_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"name":"Bruno Updated","weight":25.1}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "pet_uuid",
    "ownerId": "019f30f4-4dd7-7000-9000-000000000001",
    "name": "Bruno",
    "species": "DOG",
    "breed": "Labrador",
    "gender": "MALE",
    "dateOfBirth": "2022-01-01T00:00:00.000Z",
    "weight": "24.50",
    "color": "Golden",
    "microchipNumber": "MC123456",
    "profileImageUrl": null,
    "passportNumber": "PD-1780000000000",
    "isActive": true,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Delete Pet

| Field | Value |
| --- | --- |
| API name | Delete Pet |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner |

Path/query params:

```json
{"petId":"pet_uuid"}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X DELETE "http://localhost:3000/api/v1/pets/pet_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "pet_uuid",
    "ownerId": "019f30f4-4dd7-7000-9000-000000000001",
    "name": "Bruno",
    "species": "DOG",
    "breed": "Labrador",
    "gender": "MALE",
    "dateOfBirth": "2022-01-01T00:00:00.000Z",
    "weight": "24.50",
    "color": "Golden",
    "microchipNumber": "MC123456",
    "profileImageUrl": null,
    "passportNumber": null,
    "isActive": false,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:20:00.000Z",
    "deletedAt": "2026-07-05T10:20:00.000Z"
  }
}
```

