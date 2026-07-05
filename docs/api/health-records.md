# Health Record APIs

### List Vaccinations

| Field | Value |
| --- | --- |
| API name | List Vaccinations |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid/vaccinations` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or allowed GUARDIAN |

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
curl -X GET "http://localhost:3000/api/v1/pets/pet_uuid/vaccinations" \
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
      "id": "vaccination_uuid",
    "petId": "pet_uuid",
    "vaccineName": "Rabies",
    "vaccinationDate": "2026-07-01T00:00:00.000Z",
    "nextDueDate": "2027-07-01T00:00:00.000Z",
    "vetName": "Dr. Sen",
    "clinicName": "City Vet",
    "batchNumber": "RB-2026",
    "notes": "Annual dose",
    "documentId": "document_uuid",
    "createdBy": "019f30f4-4dd7-7000-9000-000000000001",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
    }
  ]
}
```

### Create Vaccination

| Field | Value |
| --- | --- |
| API name | Create Vaccination |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid/vaccinations` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or health guardian |

Path/query params:

```json
{"petId":"pet_uuid"}
```

Request body:

```json
{"vaccineName":"Rabies","vaccinationDate":"2026-07-01","nextDueDate":"2027-07-01","vetName":"Dr. Sen","clinicName":"City Vet","batchNumber":"RB-2026","notes":"Annual dose","documentId":"document_uuid"}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/pets/pet_uuid/vaccinations" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"vaccineName":"Rabies","vaccinationDate":"2026-07-01","nextDueDate":"2027-07-01","vetName":"Dr. Sen","clinicName":"City Vet","batchNumber":"RB-2026","notes":"Annual dose","documentId":"document_uuid"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "vaccination_uuid",
    "petId": "pet_uuid",
    "vaccineName": "Rabies",
    "vaccinationDate": "2026-07-01T00:00:00.000Z",
    "nextDueDate": "2027-07-01T00:00:00.000Z",
    "vetName": "Dr. Sen",
    "clinicName": "City Vet",
    "batchNumber": "RB-2026",
    "notes": "Annual dose",
    "documentId": "document_uuid",
    "createdBy": "019f30f4-4dd7-7000-9000-000000000001",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Update Vaccination

| Field | Value |
| --- | --- |
| API name | Update Vaccination |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/vaccinations/vaccination_uuid` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or health guardian |

Path/query params:

```json
{"vaccinationId":"vaccination_uuid"}
```

Request body:

```json
{"notes":"Updated notes","nextDueDate":"2027-08-01"}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/vaccinations/vaccination_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"notes":"Updated notes","nextDueDate":"2027-08-01"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "vaccination_uuid",
    "petId": "pet_uuid",
    "vaccineName": "Rabies",
    "vaccinationDate": "2026-07-01T00:00:00.000Z",
    "nextDueDate": "2027-07-01T00:00:00.000Z",
    "vetName": "Dr. Sen",
    "clinicName": "City Vet",
    "batchNumber": "RB-2026",
    "notes": "Annual dose",
    "documentId": "document_uuid",
    "createdBy": "019f30f4-4dd7-7000-9000-000000000001",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Delete Vaccination

| Field | Value |
| --- | --- |
| API name | Delete Vaccination |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/vaccinations/vaccination_uuid` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or health guardian |

Path/query params:

```json
{"vaccinationId":"vaccination_uuid"}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X DELETE "http://localhost:3000/api/v1/vaccinations/vaccination_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "vaccination_uuid",
    "petId": "pet_uuid",
    "vaccineName": "Rabies",
    "vaccinationDate": "2026-07-01T00:00:00.000Z",
    "nextDueDate": "2027-07-01T00:00:00.000Z",
    "vetName": "Dr. Sen",
    "clinicName": "City Vet",
    "batchNumber": "RB-2026",
    "notes": "Annual dose",
    "documentId": "document_uuid",
    "createdBy": "019f30f4-4dd7-7000-9000-000000000001",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": "2026-07-05T10:20:00.000Z"
  }
}
```

### List Deworming Records

| Field | Value |
| --- | --- |
| API name | List Deworming Records |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid/deworming` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or allowed GUARDIAN |

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
curl -X GET "http://localhost:3000/api/v1/pets/pet_uuid/deworming" \
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
      "id": "deworming_uuid",
    "petId": "pet_uuid",
    "medicineName": "Drontal",
    "givenDate": "2026-07-01T00:00:00.000Z",
    "nextDueDate": "2027-07-01T00:00:00.000Z",
    "dosage": "1 tablet",
    "vetName": "Dr. Sen",
    "notes": "Annual dose",
    "documentId": "document_uuid",
    "createdBy": "019f30f4-4dd7-7000-9000-000000000001",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
    }
  ]
}
```

### Create Deworming Record

| Field | Value |
| --- | --- |
| API name | Create Deworming Record |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid/deworming` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or health guardian |

Path/query params:

```json
{"petId":"pet_uuid"}
```

Request body:

```json
{"medicineName":"Drontal","givenDate":"2026-07-01","nextDueDate":"2026-10-01","dosage":"1 tablet","vetName":"Dr. Sen","notes":"After food","documentId":"document_uuid"}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/pets/pet_uuid/deworming" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"medicineName":"Drontal","givenDate":"2026-07-01","nextDueDate":"2026-10-01","dosage":"1 tablet","vetName":"Dr. Sen","notes":"After food","documentId":"document_uuid"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "deworming_uuid",
    "petId": "pet_uuid",
    "medicineName": "Drontal",
    "givenDate": "2026-07-01T00:00:00.000Z",
    "nextDueDate": "2027-07-01T00:00:00.000Z",
    "dosage": "1 tablet",
    "vetName": "Dr. Sen",
    "notes": "Annual dose",
    "documentId": "document_uuid",
    "createdBy": "019f30f4-4dd7-7000-9000-000000000001",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Update Deworming Record

| Field | Value |
| --- | --- |
| API name | Update Deworming Record |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/deworming/deworming_uuid` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or health guardian |

Path/query params:

```json
{"dewormingId":"deworming_uuid"}
```

Request body:

```json
{"notes":"Updated notes"}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/deworming/deworming_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"notes":"Updated notes"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "deworming_uuid",
    "petId": "pet_uuid",
    "medicineName": "Drontal",
    "givenDate": "2026-07-01T00:00:00.000Z",
    "nextDueDate": "2027-07-01T00:00:00.000Z",
    "dosage": "1 tablet",
    "vetName": "Dr. Sen",
    "notes": "Annual dose",
    "documentId": "document_uuid",
    "createdBy": "019f30f4-4dd7-7000-9000-000000000001",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Delete Deworming Record

| Field | Value |
| --- | --- |
| API name | Delete Deworming Record |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/deworming/deworming_uuid` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or health guardian |

Path/query params:

```json
{"dewormingId":"deworming_uuid"}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X DELETE "http://localhost:3000/api/v1/deworming/deworming_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "deworming_uuid",
    "petId": "pet_uuid",
    "medicineName": "Drontal",
    "givenDate": "2026-07-01T00:00:00.000Z",
    "nextDueDate": "2027-07-01T00:00:00.000Z",
    "dosage": "1 tablet",
    "vetName": "Dr. Sen",
    "notes": "Annual dose",
    "documentId": "document_uuid",
    "createdBy": "019f30f4-4dd7-7000-9000-000000000001",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": "2026-07-05T10:20:00.000Z"
  }
}
```

### List Medical Records

| Field | Value |
| --- | --- |
| API name | List Medical Records |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid/medical-records` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or allowed GUARDIAN |

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
curl -X GET "http://localhost:3000/api/v1/pets/pet_uuid/medical-records" \
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
      "id": "medical_record_uuid",
    "petId": "pet_uuid",
    "recordType": "PRESCRIPTION",
    "title": "Fever treatment",
    "description": "Prescribed medicine for 5 days",
    "recordDate": "2026-07-01T00:00:00.000Z",
    "vetName": "Dr. Sen",
    "clinicName": "City Vet",
    "documentId": "document_uuid",
    "createdBy": "019f30f4-4dd7-7000-9000-000000000001",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
    }
  ]
}
```

### Create Medical Record

| Field | Value |
| --- | --- |
| API name | Create Medical Record |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/pets/pet_uuid/medical-records` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or health guardian |

Path/query params:

```json
{"petId":"pet_uuid"}
```

Request body:

```json
{"recordType":"PRESCRIPTION","title":"Fever treatment","description":"Prescribed medicine for 5 days","recordDate":"2026-07-01","vetName":"Dr. Sen","clinicName":"City Vet","documentId":"document_uuid"}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/pets/pet_uuid/medical-records" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"recordType":"PRESCRIPTION","title":"Fever treatment","description":"Prescribed medicine for 5 days","recordDate":"2026-07-01","vetName":"Dr. Sen","clinicName":"City Vet","documentId":"document_uuid"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "medical_record_uuid",
    "petId": "pet_uuid",
    "recordType": "PRESCRIPTION",
    "title": "Fever treatment",
    "description": "Prescribed medicine for 5 days",
    "recordDate": "2026-07-01T00:00:00.000Z",
    "vetName": "Dr. Sen",
    "clinicName": "City Vet",
    "documentId": "document_uuid",
    "createdBy": "019f30f4-4dd7-7000-9000-000000000001",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Update Medical Record

| Field | Value |
| --- | --- |
| API name | Update Medical Record |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/medical-records/medical_record_uuid` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or health guardian |

Path/query params:

```json
{"recordId":"medical_record_uuid"}
```

Request body:

```json
{"title":"Fever follow-up","description":"Updated prescription"}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/medical-records/medical_record_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"title":"Fever follow-up","description":"Updated prescription"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "medical_record_uuid",
    "petId": "pet_uuid",
    "recordType": "PRESCRIPTION",
    "title": "Fever treatment",
    "description": "Prescribed medicine for 5 days",
    "recordDate": "2026-07-01T00:00:00.000Z",
    "vetName": "Dr. Sen",
    "clinicName": "City Vet",
    "documentId": "document_uuid",
    "createdBy": "019f30f4-4dd7-7000-9000-000000000001",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Delete Medical Record

| Field | Value |
| --- | --- |
| API name | Delete Medical Record |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/medical-records/medical_record_uuid` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER owner or health guardian |

Path/query params:

```json
{"recordId":"medical_record_uuid"}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X DELETE "http://localhost:3000/api/v1/medical-records/medical_record_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "medical_record_uuid",
    "petId": "pet_uuid",
    "recordType": "PRESCRIPTION",
    "title": "Fever treatment",
    "description": "Prescribed medicine for 5 days",
    "recordDate": "2026-07-01T00:00:00.000Z",
    "vetName": "Dr. Sen",
    "clinicName": "City Vet",
    "documentId": "document_uuid",
    "createdBy": "019f30f4-4dd7-7000-9000-000000000001",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": "2026-07-05T10:20:00.000Z"
  }
}
```

