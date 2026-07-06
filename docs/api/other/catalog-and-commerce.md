# Catalog and Commerce APIs

Filtered other endpoints from `catalog-and-commerce.md`.

## Public Category List

| Field | Value |
| --- | --- |
| API name | Public Category List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/categories` |
| Auth | Public |
| Roles | Public |

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
curl -X GET "http://localhost:3000/api/v1/categories" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": [
    {
      "id": "category_uuid",
      "name": "Food",
      "slug": "food",
      "parentId": null,
      "isActive": true,
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z",
      "deletedAt": null
    }
  ]
}
```

## Public Product List

| Field | Value |
| --- | --- |
| API name | Public Product List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/products?page=1&limit=20&search=food` |
| Auth | Public |
| Roles | Public |

Path/query params:

```json
{
  "page": 1,
  "limit": 20,
  "search": "food"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/products?page=1&limit=20&search=food" \
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
        "id": "product_uuid",
        "vendorId": "vendor_uuid",
        "categoryId": "category_uuid",
        "name": "Premium Dog Food",
        "sku": "DOG-FOOD-001",
        "description": "High-protein dog food",
        "price": "999",
        "discountPrice": "899",
        "petType": "DOG",
        "status": "ACTIVE",
        "isFeatured": false,
        "imageUrls": [
          "https://cdn.example.com/dog-food.webp"
        ],
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

## Public Product Detail

| Field | Value |
| --- | --- |
| API name | Public Product Detail |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/products/product_uuid` |
| Auth | Public |
| Roles | Public |

Path/query params:

```json
{
  "productId": "product_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/products/product_uuid" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "product_uuid",
    "vendorId": "vendor_uuid",
    "categoryId": "category_uuid",
    "name": "Premium Dog Food",
    "sku": "DOG-FOOD-001",
    "description": "High-protein dog food",
    "price": "999",
    "discountPrice": "899",
    "petType": "DOG",
    "status": "ACTIVE",
    "isFeatured": false,
    "imageUrls": [
      "https://cdn.example.com/dog-food.webp"
    ],
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

## Razorpay Webhook

| Field | Value |
| --- | --- |
| API name | Razorpay Webhook |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/payments/webhook` |
| Auth | Public |
| Roles | Razorpay webhook |

Path/query params:

```json
{}
```

Request body:

```json
{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_123",
        "order_id": "order_Razorpay123"
      }
    }
  }
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/payments/webhook" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"event":"payment.captured","payload":{"payment":{"entity":{"id":"pay_123","order_id":"order_Razorpay123"}}}}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "received": true
  }
}
```
