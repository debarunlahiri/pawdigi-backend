# Document APIs

Filtered customer endpoints from `documents.md`.

## Create Signed Upload URL

| Field | Value |
| --- | --- |
| API name | Create Signed Upload URL |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/documents/signed-upload-url` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{}
```

Request body:

```json
{"fileName":"rabies-certificate.pdf","mimeType":"application/pdf","size":250000,"type":"VACCINATION_CERTIFICATE","visibility":"PET_OWNER_ONLY"}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/documents/signed-upload-url" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"fileName":"rabies-certificate.pdf","mimeType":"application/pdf","size":250000,"type":"VACCINATION_CERTIFICATE","visibility":"PET_OWNER_ONLY"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {"url":"https://s3.example.com/signed-upload-url","key":"019f30f4-4dd7-7000-9000-000000000001/019f30f4-4dd7-7000-9000-000000000100-rabies-certificate.pdf"}
}
```

## Confirm Upload

| Field | Value |
| --- | --- |
| API name | Confirm Upload |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/documents/confirm-upload` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{}
```

Request body:

```json
{"storageKey":"019f30f4-4dd7-7000-9000-000000000001/019f30f4-4dd7-7000-9000-000000000100-rabies-certificate.pdf"}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/documents/confirm-upload" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"storageKey":"019f30f4-4dd7-7000-9000-000000000001/019f30f4-4dd7-7000-9000-000000000100-rabies-certificate.pdf"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id":"document_uuid","ownerId":"019f30f4-4dd7-7000-9000-000000000001","petId":null,"vendorId":null,"type":"OTHER","fileName":"019f30f4-4dd7-7000-9000-000000000100-rabies-certificate.pdf","mimeType":"application/octet-stream","size":0,"storageKey":"019f30f4-4dd7-7000-9000-000000000001/019f30f4-4dd7-7000-9000-000000000100-rabies-certificate.pdf","storageUrl":null,"visibility":"PRIVATE","createdAt":"2026-07-05T10:00:00.000Z","updatedAt":"2026-07-05T10:00:00.000Z","deletedAt":null
  }
}
```

## Get Signed View URL

| Field | Value |
| --- | --- |
| API name | Get Signed View URL |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/documents/document_uuid/signed-view-url` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER document owner |

Path/query params:

```json
{"documentId":"document_uuid"}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/documents/document_uuid/signed-view-url" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{"success":true,"message":"Operation successful","data":{"url":"https://s3.example.com/signed-view-url"}}
```

## Delete Document

| Field | Value |
| --- | --- |
| API name | Delete Document |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/documents/document_uuid` |
| Auth | Bearer CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER document owner |

Path/query params:

```json
{"documentId":"document_uuid"}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X DELETE "http://localhost:3000/api/v1/documents/document_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {"id":"document_uuid","ownerId":"019f30f4-4dd7-7000-9000-000000000001","petId":null,"vendorId":null,"type":"OTHER","fileName":"rabies-certificate.pdf","mimeType":"application/pdf","size":250000,"storageKey":"key","storageUrl":null,"visibility":"PRIVATE","createdAt":"2026-07-05T10:00:00.000Z","updatedAt":"2026-07-05T10:20:00.000Z","deletedAt":"2026-07-05T10:20:00.000Z"}
}
```
