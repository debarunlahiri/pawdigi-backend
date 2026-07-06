# Admin APIs

### Admin Dashboard Counts

| Field | Value |
| --- | --- |
| API name | Admin Dashboard Counts |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/dashboard` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

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
curl -X GET "http://localhost:3000/api/v1/admin/dashboard" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "users": 10,
    "pets": 15,
    "vendors": 3,
    "orders": 25,
    "revenue": "125000",
    "pendingVendors": 2,
    "pendingProducts": 5
  }
}
```

### List Users

| Field | Value |
| --- | --- |
| API name | List Users |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/users?page=1&limit=20&role=CUSTOMER` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "page": 1,
  "limit": 20,
  "role": "CUSTOMER"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/users?page=1&limit=20&role=CUSTOMER" \
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
        "id": "customer_user_uuid",
        "email": null,
        "phoneNumber": "+919999999999",
        "role": "CUSTOMER",
        "status": "ACTIVE",
        "lastLoginAt": "2026-07-05T10:00:00.000Z",
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z",
        "deletedAt": null,
        "customerProfile": {
          "id": "customer_profile_uuid",
          "userId": "customer_user_uuid",
          "name": "Deb",
          "createdAt": "2026-07-05T10:00:00.000Z",
          "updatedAt": "2026-07-05T10:00:00.000Z"
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

### Create User

| Field | Value |
| --- | --- |
| API name | Create User |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/admin/users` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{}
```

Request body:

```json
{
  "email": "user@example.com",
  "phoneNumber": "+919999999999",
  "role": "CUSTOMER",
  "password": "Password123!"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/admin/users" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","phoneNumber":"+919999999999","role":"CUSTOMER","password":"Password123!"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "customer_user_uuid",
    "email": null,
    "phoneNumber": "+919999999999",
    "role": "CUSTOMER",
    "status": "ACTIVE",
    "lastLoginAt": "2026-07-05T10:00:00.000Z",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null,
    "customerProfile": {
      "id": "customer_profile_uuid",
      "userId": "customer_user_uuid",
      "name": "Deb",
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z"
    }
  }
}
```

### Get User

| Field | Value |
| --- | --- |
| API name | Get User |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/users/customer_user_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "userId": "customer_user_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/users/customer_user_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "customer_user_uuid",
    "email": null,
    "phoneNumber": "+919999999999",
    "role": "CUSTOMER",
    "status": "ACTIVE",
    "lastLoginAt": "2026-07-05T10:00:00.000Z",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null,
    "customerProfile": {
      "id": "customer_profile_uuid",
      "userId": "customer_user_uuid",
      "name": "Deb",
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z"
    }
  }
}
```

### Update User

| Field | Value |
| --- | --- |
| API name | Update User |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/users/customer_user_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "userId": "customer_user_uuid"
}
```

Request body:

```json
{
  "status": "ACTIVE"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/users/customer_user_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"status":"ACTIVE"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "customer_user_uuid",
    "email": null,
    "phoneNumber": "+919999999999",
    "role": "CUSTOMER",
    "status": "ACTIVE",
    "lastLoginAt": "2026-07-05T10:00:00.000Z",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null,
    "customerProfile": {
      "id": "customer_profile_uuid",
      "userId": "customer_user_uuid",
      "name": "Deb",
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z"
    }
  }
}
```

### Block User

| Field | Value |
| --- | --- |
| API name | Block User |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/users/customer_user_uuid/block` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "userId": "customer_user_uuid"
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
curl -X PATCH "http://localhost:3000/api/v1/admin/users/customer_user_uuid/block" \
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
    "id": "customer_user_uuid",
    "email": null,
    "phoneNumber": "+919999999999",
    "role": "CUSTOMER",
    "status": "BLOCKED",
    "lastLoginAt": "2026-07-05T10:00:00.000Z",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null,
    "customerProfile": {
      "id": "customer_profile_uuid",
      "userId": "customer_user_uuid",
      "name": "Deb",
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z"
    },
    "blockReason": "Policy violation"
  }
}
```

### Unblock User

| Field | Value |
| --- | --- |
| API name | Unblock User |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/users/customer_user_uuid/unblock` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "userId": "customer_user_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/users/customer_user_uuid/unblock" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "customer_user_uuid",
    "email": null,
    "phoneNumber": "+919999999999",
    "role": "CUSTOMER",
    "status": "ACTIVE",
    "lastLoginAt": "2026-07-05T10:00:00.000Z",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null,
    "customerProfile": {
      "id": "customer_profile_uuid",
      "userId": "customer_user_uuid",
      "name": "Deb",
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z"
    }
  }
}
```

### List Customers

| Field | Value |
| --- | --- |
| API name | List Customers |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/customers?page=1&limit=20` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "page": 1,
  "limit": 20
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/customers?page=1&limit=20" \
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
        "id": "customer_user_uuid",
        "email": null,
        "phoneNumber": "+919999999999",
        "role": "CUSTOMER",
        "status": "ACTIVE",
        "lastLoginAt": "2026-07-05T10:00:00.000Z",
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z",
        "deletedAt": null,
        "customerProfile": {
          "id": "customer_profile_uuid",
          "userId": "customer_user_uuid",
          "name": "Deb",
          "createdAt": "2026-07-05T10:00:00.000Z",
          "updatedAt": "2026-07-05T10:00:00.000Z"
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

### Get Customer

| Field | Value |
| --- | --- |
| API name | Get Customer |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/customers/customer_user_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "userId": "customer_user_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/customers/customer_user_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "customer_user_uuid",
    "email": null,
    "phoneNumber": "+919999999999",
    "role": "CUSTOMER",
    "status": "ACTIVE",
    "lastLoginAt": "2026-07-05T10:00:00.000Z",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null,
    "customerProfile": {
      "id": "customer_profile_uuid",
      "userId": "customer_user_uuid",
      "name": "Deb",
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z"
    }
  }
}
```

### List Admins

| Field | Value |
| --- | --- |
| API name | List Admins |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/admins?page=1&limit=20` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | SUPER_ADMIN |

Path/query params:

```json
{
  "page": 1,
  "limit": 20
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/admins?page=1&limit=20" \
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
        "id": "admin_user_uuid",
        "email": "admin@example.com",
        "phoneNumber": null,
        "role": "ADMIN",
        "status": "ACTIVE",
        "lastLoginAt": "2026-07-05T10:00:00.000Z",
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

### Create Admin

| Field | Value |
| --- | --- |
| API name | Create Admin |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/admin/admins` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | SUPER_ADMIN |

Path/query params:

```json
{}
```

Request body:

```json
{
  "email": "admin2@example.com",
  "password": "Password123!",
  "name": "Admin Two",
  "role": "ADMIN"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/admin/admins" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin2@example.com","password":"Password123!","name":"Admin Two","role":"ADMIN"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "admin_user_uuid",
    "email": "admin@example.com",
    "phoneNumber": null,
    "role": "ADMIN",
    "status": "ACTIVE",
    "lastLoginAt": "2026-07-05T10:00:00.000Z",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Update Admin

| Field | Value |
| --- | --- |
| API name | Update Admin |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/admins/admin_user_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | SUPER_ADMIN |

Path/query params:

```json
{
  "userId": "admin_user_uuid"
}
```

Request body:

```json
{
  "name": "Admin Updated",
  "status": "ACTIVE"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/admins/admin_user_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin Updated","status":"ACTIVE"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "admin_user_uuid",
    "email": "admin@example.com",
    "phoneNumber": null,
    "role": "ADMIN",
    "status": "ACTIVE",
    "lastLoginAt": "2026-07-05T10:00:00.000Z",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null,
    "name": "Admin Updated"
  }
}
```

### List Pets

| Field | Value |
| --- | --- |
| API name | List Pets |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/pets?page=1&limit=20` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "page": 1,
  "limit": 20
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/pets?page=1&limit=20" \
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
        "id": "pet_uuid",
        "ownerId": "customer_user_uuid",
        "name": "Bruno",
        "species": "DOG",
        "breed": "Labrador",
        "gender": "MALE",
        "dateOfBirth": "2022-01-01T00:00:00.000Z",
        "weightKg": "28.5",
        "color": "Golden",
        "microchipNo": "MC123",
        "profileImageUrl": "https://cdn.example.com/bruno.webp",
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z",
        "deletedAt": null,
        "owner": {
          "id": "customer_user_uuid",
          "email": null,
          "phoneNumber": "+919999999999",
          "role": "CUSTOMER",
          "status": "ACTIVE",
          "lastLoginAt": "2026-07-05T10:00:00.000Z",
          "createdAt": "2026-07-05T10:00:00.000Z",
          "updatedAt": "2026-07-05T10:00:00.000Z",
          "deletedAt": null,
          "customerProfile": {
            "id": "customer_profile_uuid",
            "userId": "customer_user_uuid",
            "name": "Deb",
            "createdAt": "2026-07-05T10:00:00.000Z",
            "updatedAt": "2026-07-05T10:00:00.000Z"
          }
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

### Get Pet

| Field | Value |
| --- | --- |
| API name | Get Pet |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/pets/pet_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

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
curl -X GET "http://localhost:3000/api/v1/admin/pets/pet_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "pet_uuid",
    "ownerId": "customer_user_uuid",
    "name": "Bruno",
    "species": "DOG",
    "breed": "Labrador",
    "gender": "MALE",
    "dateOfBirth": "2022-01-01T00:00:00.000Z",
    "weightKg": "28.5",
    "color": "Golden",
    "microchipNo": "MC123",
    "profileImageUrl": "https://cdn.example.com/bruno.webp",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null,
    "owner": {
      "id": "customer_user_uuid",
      "email": null,
      "phoneNumber": "+919999999999",
      "role": "CUSTOMER",
      "status": "ACTIVE",
      "lastLoginAt": "2026-07-05T10:00:00.000Z",
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z",
      "deletedAt": null,
      "customerProfile": {
        "id": "customer_profile_uuid",
        "userId": "customer_user_uuid",
        "name": "Deb",
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z"
      }
    }
  }
}
```

### User Report

| Field | Value |
| --- | --- |
| API name | User Report |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/reports/users?from=2026-07-01&to=2026-07-05` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "from": "2026-07-01",
  "to": "2026-07-05"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/reports/users?from=2026-07-01&to=2026-07-05" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "total": 10,
    "active": 8,
    "blocked": 1,
    "deleted": 1,
    "from": "2026-07-01",
    "to": "2026-07-05"
  }
}
```

### Order Report

| Field | Value |
| --- | --- |
| API name | Order Report |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/reports/orders?from=2026-07-01&to=2026-07-05` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "from": "2026-07-01",
  "to": "2026-07-05"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/reports/orders?from=2026-07-01&to=2026-07-05" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "totalOrders": 25,
    "placed": 12,
    "delivered": 10,
    "cancelled": 3,
    "grossRevenue": "125000",
    "from": "2026-07-01",
    "to": "2026-07-05"
  }
}
```

### Vendor Report

| Field | Value |
| --- | --- |
| API name | Vendor Report |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/reports/vendors?from=2026-07-01&to=2026-07-05` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "from": "2026-07-01",
  "to": "2026-07-05"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/reports/vendors?from=2026-07-01&to=2026-07-05" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "totalVendors": 3,
    "approved": 1,
    "pending": 2,
    "rejected": 0,
    "from": "2026-07-01",
    "to": "2026-07-05"
  }
}
```

### Vendor Summary Report

| Field | Value |
| --- | --- |
| API name | Vendor Summary Report |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/vendor/reports/summary?from=2026-07-01&to=2026-07-05` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR |

Path/query params:

```json
{
  "from": "2026-07-01",
  "to": "2026-07-05"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/vendor/reports/summary?from=2026-07-01&to=2026-07-05" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "orders": 7,
    "revenue": "35000",
    "products": 12,
    "lowStockProducts": 2,
    "from": "2026-07-01",
    "to": "2026-07-05"
  }
}
```

### Audit Log List

| Field | Value |
| --- | --- |
| API name | Audit Log List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/audit-logs?page=1&limit=20` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "page": 1,
  "limit": 20
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/audit-logs?page=1&limit=20" \
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
        "id": "audit_log_uuid",
        "actorUserId": "admin_user_uuid",
        "actorRole": "ADMIN",
        "action": "PRODUCT_APPROVED",
        "entityType": "Product",
        "entityId": "product_uuid",
        "oldValue": null,
        "newValue": {
          "status": "ACTIVE"
        },
        "ipAddress": null,
        "userAgent": null,
        "createdAt": "2026-07-05T10:00:00.000Z"
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
