# Review APIs

Filtered admin endpoints from `reviews.md`.

## Admin Review List

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

## Admin Moderate Review

| Field | Value |
| --- | --- |
| API name | Admin Moderate Review |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/reviews/review_uuid/moderate` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Request body:

```json
{
  "status": "APPROVED"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/reviews/review_uuid/moderate" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"status":"APPROVED"}'
```

Response:

```json
{
  "success": true,
  "message": "Review moderated successfully",
  "data": {
    "id": "review_uuid",
    "status": "APPROVED",
    "moderatedAt": "2026-07-05T10:00:00.000Z",
    "moderatedBy": "admin_user_uuid"
  }
}
```
