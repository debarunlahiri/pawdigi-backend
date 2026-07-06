# Admin Inventory APIs

Admin endpoints for viewing and adjusting inventory.

## Admin Inventory List

| Field | Value |
| --- | --- |
| API name | Admin Inventory List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/inventory?page=1&limit=20` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "page": 1,
  "limit": 20,
  "search": "dog food"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/inventory?page=1&limit=20" \
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
        "id": "inventory_uuid",
        "productId": "product_uuid",
        "stock": 100,
        "reserved": 0,
        "available": 100,
        "lowStockAlert": 5,
        "lastRestockedAt": "2026-07-05T10:00:00.000Z",
        "product": {
          "id": "product_uuid",
          "name": "Premium Dog Food",
          "sku": "DOG-FOOD-001",
          "vendor": { "businessName": "Happy Paws Store" },
          "category": { "name": "Food" }
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

## Admin Inventory Detail

| Field | Value |
| --- | --- |
| API name | Admin Inventory Detail |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/inventory/product_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/inventory/product_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

## Admin Update Inventory

| Field | Value |
| --- | --- |
| API name | Admin Update Inventory |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/inventory/product_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Request body:

```json
{
  "stock": 150
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/inventory/product_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"stock":150}'
```

Response:

```json
{
  "success": true,
  "message": "Inventory updated successfully",
  "data": {
    "id": "inventory_uuid",
    "productId": "product_uuid",
    "stock": 150,
    "available": 150,
    "lastRestockedAt": "2026-07-05T10:00:00.000Z"
  }
}
```
