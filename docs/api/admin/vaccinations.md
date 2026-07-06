# Admin Vaccination APIs

Admin endpoints for managing vaccination records across all pets.

## Admin Vaccination List

| Field | Value |
| --- | --- |
| API name | Admin Vaccination List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/vaccinations?page=1&limit=20` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "page": 1,
  "limit": 20,
  "search": "rabies"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/vaccinations?page=1&limit=20" \
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
        "id": "vaccination_uuid",
        "petId": "pet_uuid",
        "vaccineName": "Rabies",
        "vaccinationDate": "2026-07-01T00:00:00.000Z",
        "nextDueDate": "2027-07-01T00:00:00.000Z",
        "vetName": "Dr. Smith",
        "clinicName": "Pet Care Clinic",
        "notes": "Annual booster",
        "pet": {
          "id": "pet_uuid",
          "name": "Bruno",
          "owner": { "id": "customer_user_uuid", "phoneNumber": "+919999999999" }
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

## Admin Vaccination Detail

| Field | Value |
| --- | --- |
| API name | Admin Vaccination Detail |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/vaccinations/vaccination_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/vaccinations/vaccination_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

## Admin Create Vaccination

| Field | Value |
| --- | --- |
| API name | Admin Create Vaccination |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/admin/vaccinations` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Request body:

```json
{
  "petId": "pet_uuid",
  "vaccineName": "Rabies",
  "vaccinationDate": "2026-07-01",
  "nextDueDate": "2027-07-01",
  "vetName": "Dr. Smith",
  "clinicName": "Pet Care Clinic",
  "notes": "Annual booster"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/admin/vaccinations" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"petId":"pet_uuid","vaccineName":"Rabies","vaccinationDate":"2026-07-01","nextDueDate":"2027-07-01","vetName":"Dr. Smith","clinicName":"Pet Care Clinic","notes":"Annual booster"}'
```

Response:

```json
{
  "success": true,
  "message": "Vaccination record created successfully",
  "data": {
    "id": "vaccination_uuid",
    "petId": "pet_uuid",
    "vaccineName": "Rabies",
    "vaccinationDate": "2026-07-01T00:00:00.000Z",
    "createdBy": "ADMIN"
  }
}
```

## Admin Update Vaccination

| Field | Value |
| --- | --- |
| API name | Admin Update Vaccination |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/vaccinations/vaccination_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Request body:

```json
{
  "nextDueDate": "2027-08-01",
  "notes": "Updated notes"
}
```

## Admin Delete Vaccination

| Field | Value |
| --- | --- |
| API name | Admin Delete Vaccination |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/admin/vaccinations/vaccination_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X DELETE "http://localhost:3000/api/v1/admin/vaccinations/vaccination_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Vaccination record deleted successfully",
  "data": {
    "id": "vaccination_uuid",
    "deletedAt": "2026-07-05T10:00:00.000Z"
  }
}
```
