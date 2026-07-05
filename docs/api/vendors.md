# Vendor APIs

### Get Vendor Profile

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

### Update Vendor Profile

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

### Submit Vendor KYC

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

### Admin Vendor List

| Field | Value |
| --- | --- |
| API name | Admin Vendor List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/vendors?page=1&limit=20&status=PENDING` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "page": 1,
  "limit": 20,
  "status": "PENDING"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/vendors?page=1&limit=20&status=PENDING" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
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

### Admin Approve Vendor

| Field | Value |
| --- | --- |
| API name | Admin Approve Vendor |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/vendors/vendor_uuid/approve` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "vendorId": "vendor_uuid"
}
```

Request body:

```json
{
  "note": "KYC verified"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/vendors/vendor_uuid/approve" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"note":"KYC verified"}'
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
    "status": "APPROVED",
    "rejectionReason": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Admin Reject Vendor

| Field | Value |
| --- | --- |
| API name | Admin Reject Vendor |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/vendors/vendor_uuid/reject` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "vendorId": "vendor_uuid"
}
```

Request body:

```json
{
  "reason": "GST document is unclear"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/vendors/vendor_uuid/reject" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"reason":"GST document is unclear"}'
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
    "status": "REJECTED",
    "rejectionReason": "GST document is unclear",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Admin Suspend Vendor

| Field | Value |
| --- | --- |
| API name | Admin Suspend Vendor |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/vendors/vendor_uuid/suspend` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "vendorId": "vendor_uuid"
}
```

Request body:

```json
{
  "reason": "Policy violation"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/vendors/vendor_uuid/suspend" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"reason":"Policy violation"}'
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
    "status": "SUSPENDED",
    "rejectionReason": "Policy violation",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

