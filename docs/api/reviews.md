# Review APIs

### Product Reviews

| Field | Value |
| --- | --- |
| API name | Product Reviews |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/reviews/products/product_uuid?page=1&limit=20` |
| Auth | Public |
| Roles | Public |

Path/query params:

```json
{
  "productId": "product_uuid",
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
curl -X GET "http://localhost:3000/api/v1/reviews/products/product_uuid?page=1&limit=20" \
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
        "id": "review_uuid",
        "productId": "product_uuid",
        "customerId": "019f30f4-4dd7-7000-9000-000000000001",
        "rating": 5,
        "comment": "Great product",
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z",
        "customer": {
          "id": "019f30f4-4dd7-7000-9000-000000000001",
          "name": "Deb"
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

### Create Review

| Field | Value |
| --- | --- |
| API name | Create Review |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/reviews` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{}
```

Request body:

```json
{
  "productId": "product_uuid",
  "rating": 5,
  "comment": "Great product"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/reviews" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"productId":"product_uuid","rating":5,"comment":"Great product"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "review_uuid",
    "productId": "product_uuid",
    "customerId": "019f30f4-4dd7-7000-9000-000000000001",
    "rating": 5,
    "comment": "Great product",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "customer": {
      "id": "019f30f4-4dd7-7000-9000-000000000001",
      "name": "Deb"
    }
  }
}
```

### Update Review

| Field | Value |
| --- | --- |
| API name | Update Review |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/reviews/review_uuid` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER review owner |

Path/query params:

```json
{
  "reviewId": "review_uuid"
}
```

Request body:

```json
{
  "rating": 4,
  "comment": "Updated after use"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/reviews/review_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"rating":4,"comment":"Updated after use"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "review_uuid",
    "productId": "product_uuid",
    "customerId": "019f30f4-4dd7-7000-9000-000000000001",
    "rating": 4,
    "comment": "Updated after use",
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "customer": {
      "id": "019f30f4-4dd7-7000-9000-000000000001",
      "name": "Deb"
    }
  }
}
```

### Admin Review List

| Field | Value |
| --- | --- |
| API name | Admin Review List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/reviews?page=1&limit=20` |
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
curl -X GET "http://localhost:3000/api/v1/admin/reviews?page=1&limit=20" \
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
        "id": "review_uuid",
        "productId": "product_uuid",
        "customerId": "019f30f4-4dd7-7000-9000-000000000001",
        "rating": 5,
        "comment": "Great product",
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z",
        "customer": {
          "id": "019f30f4-4dd7-7000-9000-000000000001",
          "name": "Deb"
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

