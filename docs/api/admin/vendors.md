# Vendor APIs

Filtered admin endpoints from `vendors.md`.

## Admin Vendor List

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

## Admin Vendor Detail

| Field | Value |
| --- | --- |
| API name | Admin Vendor Detail |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/vendors/vendor_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/vendors/vendor_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": {
    "id": "vendor_uuid",
    "userId": "vendor_user_uuid",
    "businessName": "Happy Paws Store",
    "email": "vendor@example.com",
    "status": "PENDING",
    "user": { "id": "vendor_user_uuid", "phoneNumber": "+919999999998" },
    "documents": [],
    "products": [],
    "orders": []
  }
}
```

## Admin Approve Vendor

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

## Admin Reject Vendor

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

## Admin Suspend Vendor

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

## Admin Reactivate Vendor

| Field | Value |
| --- | --- |
| API name | Admin Reactivate Vendor |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/vendors/vendor_uuid/reactivate` |
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
{}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/vendors/vendor_uuid/reactivate" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "vendor_uuid",
    "status": "APPROVED",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```
