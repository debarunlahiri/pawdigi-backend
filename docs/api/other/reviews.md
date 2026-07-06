# Review APIs

Filtered other endpoints from `reviews.md`.

## Product Reviews

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
