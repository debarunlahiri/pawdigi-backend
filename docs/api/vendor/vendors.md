# Vendor APIs

Filtered vendor endpoints from `vendors.md`.

## Get Vendor Profile

| Field | Value |
| --- | --- |
| API name | Get Vendor Profile |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/vendor/profile` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR |

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
curl -X GET "http://localhost:3000/api/v1/vendor/profile" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "vendor_uuid",
    "userId": "vendor_user_uuid",
    "businessName": "Happy Paws Store",
    "contactPerson": "Amit",
    "email": "vendor@example.com",
    "phoneNumber": "+919999999998",
    "gstNumber": "27ABCDE1234F1Z5",
    "panNumber": "ABCDE1234F",
    "address": "Salt Lake",
    "city": "Kolkata",
    "state": "WB",
    "pincode": "700091",
    "status": "PENDING",
    "rejectionReason": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

## Update Vendor Profile

| Field | Value |
| --- | --- |
| API name | Update Vendor Profile |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/vendor/profile` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR |

Path/query params:

```json
{}
```

Request body:

```json
{
  "businessName": "Happy Paws Store",
  "contactPerson": "Amit",
  "phoneNumber": "+919999999998",
  "address": "Salt Lake",
  "city": "Kolkata",
  "state": "WB",
  "pincode": "700091"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/vendor/profile" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"businessName":"Happy Paws Store","contactPerson":"Amit","phoneNumber":"+919999999998","address":"Salt Lake","city":"Kolkata","state":"WB","pincode":"700091"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "vendor_uuid",
    "userId": "vendor_user_uuid",
    "businessName": "Happy Paws Store",
    "contactPerson": "Amit",
    "email": "vendor@example.com",
    "phoneNumber": "+919999999998",
    "gstNumber": "27ABCDE1234F1Z5",
    "panNumber": "ABCDE1234F",
    "address": "Salt Lake",
    "city": "Kolkata",
    "state": "WB",
    "pincode": "700091",
    "status": "PENDING",
    "rejectionReason": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

## Submit Vendor KYC

| Field | Value |
| --- | --- |
| API name | Submit Vendor KYC |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/vendor/kyc` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR |

Path/query params:

```json
{}
```

Request body:

```json
{
  "gstNumber": "27ABCDE1234F1Z5",
  "panNumber": "ABCDE1234F",
  "documentIds": [
    "document_uuid"
  ]
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/vendor/kyc" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"gstNumber":"27ABCDE1234F1Z5","panNumber":"ABCDE1234F","documentIds":["document_uuid"]}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "vendor_uuid",
    "userId": "vendor_user_uuid",
    "businessName": "Happy Paws Store",
    "contactPerson": "Amit",
    "email": "vendor@example.com",
    "phoneNumber": "+919999999998",
    "gstNumber": "27ABCDE1234F1Z5",
    "panNumber": "ABCDE1234F",
    "address": "Salt Lake",
    "city": "Kolkata",
    "state": "WB",
    "pincode": "700091",
    "status": "PENDING",
    "rejectionReason": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null,
    "documents": [
      {
        "id": "document_uuid",
        "ownerId": "vendor_user_uuid",
        "petId": null,
        "vendorId": "vendor_uuid",
        "type": "VENDOR_KYC",
        "fileName": "gst.pdf",
        "mimeType": "application/pdf",
        "size": 100000,
        "storageKey": "vendor/gst.pdf",
        "storageUrl": null,
        "visibility": "ADMIN_ONLY",
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z",
        "deletedAt": null
      }
    ]
  }
}
```
