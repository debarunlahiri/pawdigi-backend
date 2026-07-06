# Catalog and Commerce APIs

Filtered vendor endpoints from `catalog-and-commerce.md`.

## Vendor Product List

| Field | Value |
| --- | --- |
| API name | Vendor Product List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/vendor/products?page=1&limit=20` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR |

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
curl -X GET "http://localhost:3000/api/v1/vendor/products?page=1&limit=20" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
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

## Vendor Create Product

| Field | Value |
| --- | --- |
| API name | Vendor Create Product |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/vendor/products` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR |

Path/query params:

```json
{}
```

Request body:

```json
{
  "categoryId": "category_uuid",
  "name": "Premium Dog Food",
  "sku": "DOG-FOOD-001",
  "description": "High-protein dog food",
  "price": 999,
  "discountPrice": 899,
  "petType": "DOG",
  "imageUrls": [
    "https://cdn.example.com/dog-food.webp"
  ]
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/vendor/products" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"categoryId":"category_uuid","name":"Premium Dog Food","sku":"DOG-FOOD-001","description":"High-protein dog food","price":999,"discountPrice":899,"petType":"DOG","imageUrls":["https://cdn.example.com/dog-food.webp"]}'
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
    "status": "PENDING_APPROVAL",
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

## Vendor Update Product

| Field | Value |
| --- | --- |
| API name | Vendor Update Product |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/vendor/products/product_uuid` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR owner |

Path/query params:

```json
{
  "productId": "product_uuid"
}
```

Request body:

```json
{
  "price": 949,
  "discountPrice": 849
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/vendor/products/product_uuid" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"price":949,"discountPrice":849}'
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
    "price": "949",
    "discountPrice": "849",
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

## Vendor Delete Product

| Field | Value |
| --- | --- |
| API name | Vendor Delete Product |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/vendor/products/product_uuid` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR owner |

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
curl -X DELETE "http://localhost:3000/api/v1/vendor/products/product_uuid" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "product_uuid",
    "deletedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

## Vendor Update Inventory

| Field | Value |
| --- | --- |
| API name | Vendor Update Inventory |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/vendor/inventory/product_uuid` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR product owner |

Path/query params:

```json
{
  "productId": "product_uuid"
}
```

Request body:

```json
{
  "stock": 100
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/vendor/inventory/product_uuid" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"stock":100}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "inventory_uuid",
    "productId": "product_uuid",
    "stock": 100,
    "reserved": 0,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

## Vendor Order List

| Field | Value |
| --- | --- |
| API name | Vendor Order List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/vendor/orders?page=1&limit=20` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR |

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
curl -X GET "http://localhost:3000/api/v1/vendor/orders?page=1&limit=20" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
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
        "id": "order_uuid",
        "customerId": "019f30f4-4dd7-7000-9000-000000000001",
        "vendorId": "vendor_uuid",
        "status": "PLACED",
        "totalAmount": "1798",
        "address": {
          "name": "Deb",
          "phone": "+919999999999",
          "line1": "123 Street",
          "city": "Kolkata",
          "state": "WB",
          "pincode": "700001"
        },
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z",
        "items": [
          {
            "id": "order_item_uuid",
            "orderId": "order_uuid",
            "productId": "product_uuid",
            "quantity": 2,
            "unitPrice": "899",
            "createdAt": "2026-07-05T10:00:00.000Z",
            "product": {
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
        ]
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

## Vendor Update Order Status

| Field | Value |
| --- | --- |
| API name | Vendor Update Order Status |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/vendor/orders/order_uuid/status` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR order owner |

Path/query params:

```json
{
  "orderId": "order_uuid"
}
```

Request body:

```json
{
  "status": "CONFIRMED"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/vendor/orders/order_uuid/status" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"status":"CONFIRMED"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "order_uuid",
    "customerId": "019f30f4-4dd7-7000-9000-000000000001",
    "vendorId": "vendor_uuid",
    "status": "CONFIRMED",
    "totalAmount": "1798",
    "address": {
      "name": "Deb",
      "phone": "+919999999999",
      "line1": "123 Street",
      "city": "Kolkata",
      "state": "WB",
      "pincode": "700001"
    },
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "items": [
      {
        "id": "order_item_uuid",
        "orderId": "order_uuid",
        "productId": "product_uuid",
        "quantity": 2,
        "unitPrice": "899",
        "createdAt": "2026-07-05T10:00:00.000Z",
        "product": {
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
    ]
  }
}
```
