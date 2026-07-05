# Catalog and Commerce APIs

### Public Category List

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

### Admin Category List

| Field | Value |
| --- | --- |
| API name | Admin Category List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/categories` |
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
curl -X GET "http://localhost:3000/api/v1/admin/categories" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
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

### Admin Create Category

| Field | Value |
| --- | --- |
| API name | Admin Create Category |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/admin/categories` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{}
```

Request body:

```json
{
  "name": "Food",
  "slug": "food",
  "parentId": null
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/admin/categories" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"name":"Food","slug":"food","parentId":null}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "category_uuid",
    "name": "Food",
    "slug": "food",
    "parentId": null,
    "isActive": true,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Admin Update Category

| Field | Value |
| --- | --- |
| API name | Admin Update Category |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/categories/category_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "categoryId": "category_uuid"
}
```

Request body:

```json
{
  "name": "Dog Food",
  "isActive": true
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/categories/category_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"name":"Dog Food","isActive":true}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "category_uuid",
    "name": "Dog Food",
    "slug": "food",
    "parentId": null,
    "isActive": true,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

### Admin Delete Category

| Field | Value |
| --- | --- |
| API name | Admin Delete Category |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/admin/categories/category_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "categoryId": "category_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X DELETE "http://localhost:3000/api/v1/admin/categories/category_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "category_uuid",
    "deletedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

### Public Product List

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

### Public Product Detail

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

### Vendor Product List

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

### Vendor Create Product

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

### Vendor Update Product

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

### Vendor Delete Product

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

### Admin Product List

| Field | Value |
| --- | --- |
| API name | Admin Product List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/products?page=1&limit=20&status=PENDING_APPROVAL` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "page": 1,
  "limit": 20,
  "status": "PENDING_APPROVAL"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/products?page=1&limit=20&status=PENDING_APPROVAL" \
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

### Admin Approve Product

| Field | Value |
| --- | --- |
| API name | Admin Approve Product |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/products/product_uuid/approve` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "productId": "product_uuid"
}
```

Request body:

```json
{
  "note": "Approved"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/products/product_uuid/approve" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"note":"Approved"}'
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

### Admin Reject Product

| Field | Value |
| --- | --- |
| API name | Admin Reject Product |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/products/product_uuid/reject` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "productId": "product_uuid"
}
```

Request body:

```json
{
  "reason": "Image quality is poor"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/products/product_uuid/reject" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"reason":"Image quality is poor"}'
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
    "status": "REJECTED",
    "isFeatured": false,
    "imageUrls": [
      "https://cdn.example.com/dog-food.webp"
    ],
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null,
    "rejectionReason": "Image quality is poor"
  }
}
```

### Vendor Update Inventory

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

### Get Cart

| Field | Value |
| --- | --- |
| API name | Get Cart |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/cart` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

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
curl -X GET "http://localhost:3000/api/v1/cart" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "cart_uuid",
    "customerId": "019f30f4-4dd7-7000-9000-000000000001",
    "items": [
      {
        "id": "cart_item_uuid",
        "cartId": "cart_uuid",
        "productId": "product_uuid",
        "quantity": 2,
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z",
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
    ],
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

### Add Cart Item

| Field | Value |
| --- | --- |
| API name | Add Cart Item |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/cart/items` |
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
  "quantity": 2
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/cart/items" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"productId":"product_uuid","quantity":2}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "cart_item_uuid",
    "cartId": "cart_uuid",
    "productId": "product_uuid",
    "quantity": 2,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
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
}
```

### Update Cart Item

| Field | Value |
| --- | --- |
| API name | Update Cart Item |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/cart/items/cart_item_uuid` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{
  "cartItemId": "cart_item_uuid"
}
```

Request body:

```json
{
  "quantity": 3
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/cart/items/cart_item_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"quantity":3}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "cart_item_uuid",
    "cartId": "cart_uuid",
    "productId": "product_uuid",
    "quantity": 3,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
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
}
```

### Remove Cart Item

| Field | Value |
| --- | --- |
| API name | Remove Cart Item |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/cart/items/cart_item_uuid` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{
  "cartItemId": "cart_item_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X DELETE "http://localhost:3000/api/v1/cart/items/cart_item_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "cart_item_uuid",
    "removed": true
  }
}
```

### Clear Cart

| Field | Value |
| --- | --- |
| API name | Clear Cart |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/cart` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

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
curl -X DELETE "http://localhost:3000/api/v1/cart" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "cartId": "cart_uuid",
    "items": []
  }
}
```

### Create Order

| Field | Value |
| --- | --- |
| API name | Create Order |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/orders` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

Path/query params:

```json
{}
```

Request body:

```json
{
  "items": [
    {
      "productId": "product_uuid",
      "quantity": 2
    }
  ],
  "address": {
    "name": "Deb",
    "phone": "+919999999999",
    "line1": "123 Street",
    "city": "Kolkata",
    "state": "WB",
    "pincode": "700001"
  }
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/orders" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"items":[{"productId":"product_uuid","quantity":2}],"address":{"name":"Deb","phone":"+919999999999","line1":"123 Street","city":"Kolkata","state":"WB","pincode":"700001"}}'
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
}
```

### List Customer Orders

| Field | Value |
| --- | --- |
| API name | List Customer Orders |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/orders?page=1&limit=20` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER |

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
curl -X GET "http://localhost:3000/api/v1/orders?page=1&limit=20" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
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

### Get Customer Order

| Field | Value |
| --- | --- |
| API name | Get Customer Order |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/orders/order_uuid` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER order owner |

Path/query params:

```json
{
  "orderId": "order_uuid"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/orders/order_uuid" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json"
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
}
```

### Cancel Order

| Field | Value |
| --- | --- |
| API name | Cancel Order |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/orders/order_uuid/cancel` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER order owner |

Path/query params:

```json
{
  "orderId": "order_uuid"
}
```

Request body:

```json
{
  "reason": "Ordered by mistake"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/orders/order_uuid/cancel" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"reason":"Ordered by mistake"}'
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
    "status": "CANCELLED",
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
    ],
    "cancelReason": "Ordered by mistake"
  }
}
```

### Vendor Order List

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

### Vendor Update Order Status

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

### Admin Order List

| Field | Value |
| --- | --- |
| API name | Admin Order List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/orders?page=1&limit=20` |
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
curl -X GET "http://localhost:3000/api/v1/admin/orders?page=1&limit=20" \
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

### Create Payment

| Field | Value |
| --- | --- |
| API name | Create Payment |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/payments/create` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER order owner |

Path/query params:

```json
{}
```

Request body:

```json
{
  "orderId": "order_uuid"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/payments/create" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"orderId":"order_uuid"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "payment": {
      "id": "payment_uuid",
      "orderId": "order_uuid",
      "provider": "RAZORPAY",
      "providerOrderId": "order_Razorpay123",
      "providerPaymentId": null,
      "status": "PENDING",
      "amount": "1798",
      "currency": "INR",
      "webhookEventId": null,
      "rawPayload": null,
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z"
    },
    "gatewayOrder": {
      "providerOrderId": "order_Razorpay123",
      "amount": 179800,
      "currency": "INR"
    }
  }
}
```

### Verify Payment

| Field | Value |
| --- | --- |
| API name | Verify Payment |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/payments/verify` |
| Auth | Bearer $CUSTOMER_ACCESS_TOKEN |
| Roles | CUSTOMER order owner |

Path/query params:

```json
{}
```

Request body:

```json
{
  "razorpayOrderId": "order_Razorpay123",
  "razorpayPaymentId": "pay_123",
  "razorpaySignature": "signature"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/payments/verify" \
  -H "Authorization: Bearer $CUSTOMER_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"razorpayOrderId":"order_Razorpay123","razorpayPaymentId":"pay_123","razorpaySignature":"signature"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "payment_uuid",
    "orderId": "order_uuid",
    "provider": "RAZORPAY",
    "providerOrderId": "order_Razorpay123",
    "providerPaymentId": "pay_123",
    "status": "SUCCESS",
    "amount": "1798",
    "currency": "INR",
    "webhookEventId": null,
    "rawPayload": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

### Razorpay Webhook

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

### Admin Payment List

| Field | Value |
| --- | --- |
| API name | Admin Payment List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/payments?page=1&limit=20` |
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
curl -X GET "http://localhost:3000/api/v1/admin/payments?page=1&limit=20" \
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
        "id": "payment_uuid",
        "orderId": "order_uuid",
        "provider": "RAZORPAY",
        "providerOrderId": "order_Razorpay123",
        "providerPaymentId": null,
        "status": "PENDING",
        "amount": "1798",
        "currency": "INR",
        "webhookEventId": null,
        "rawPayload": null,
        "createdAt": "2026-07-05T10:00:00.000Z",
        "updatedAt": "2026-07-05T10:00:00.000Z"
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

### Admin Refund

| Field | Value |
| --- | --- |
| API name | Admin Refund |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/admin/payments/refund` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{}
```

Request body:

```json
{
  "paymentId": "payment_uuid",
  "amount": 1798,
  "reason": "Customer requested refund"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/admin/payments/refund" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"paymentId":"payment_uuid","amount":1798,"reason":"Customer requested refund"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "payment": {
      "id": "payment_uuid",
      "orderId": "order_uuid",
      "provider": "RAZORPAY",
      "providerOrderId": "order_Razorpay123",
      "providerPaymentId": "pay_123",
      "status": "REFUNDED",
      "amount": "1798",
      "currency": "INR",
      "webhookEventId": null,
      "rawPayload": null,
      "createdAt": "2026-07-05T10:00:00.000Z",
      "updatedAt": "2026-07-05T10:00:00.000Z"
    },
    "providerRefund": {
      "providerRefundId": "rfnd_123",
      "status": "processed",
      "amount": 1798
    }
  }
}
```

