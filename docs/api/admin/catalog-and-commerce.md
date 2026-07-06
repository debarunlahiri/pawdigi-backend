# Catalog and Commerce APIs

Filtered admin endpoints from `catalog-and-commerce.md`.

## Admin Category List

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

## Admin Create Category

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

## Admin Update Category

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

## Admin Delete Category

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

## Admin Product List

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

## Admin Product Detail

| Field | Value |
| --- | --- |
| API name | Admin Product Detail |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/products/product_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/products/product_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Data fetched successfully",
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
    "vendor": { "businessName": "Happy Paws Store" },
    "category": { "name": "Food" },
    "inventory": { "stock": 100, "available": 100 },
    "images": [],
    "reviews": [],
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z",
    "deletedAt": null
  }
}
```

## Admin Update Product

| Field | Value |
| --- | --- |
| API name | Admin Update Product |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/products/product_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Request body:

```json
{
  "status": "ACTIVE",
  "isFeatured": true
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/products/product_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"status":"ACTIVE","isFeatured":true}'
```

Response:

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "product_uuid",
    "status": "ACTIVE",
    "isFeatured": true
  }
}
```

## Admin Approve Product

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

## Admin Reject Product

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

## Admin Delete Product

| Field | Value |
| --- | --- |
| API name | Admin Delete Product |
| Method | `DELETE` |
| Full URL | `http://localhost:3000/api/v1/admin/products/product_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X DELETE "http://localhost:3000/api/v1/admin/products/product_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "id": "product_uuid",
    "status": "INACTIVE",
    "deletedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

## Admin Order List

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

## Admin Order Detail

| Field | Value |
| --- | --- |
| API name | Admin Order Detail |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/orders/order_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/orders/order_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": {
    "id": "order_uuid",
    "orderNumber": "ORD-001",
    "customerId": "customer_user_uuid",
    "vendorId": "vendor_uuid",
    "status": "PLACED",
    "totalAmount": "1798",
    "items": [],
    "payment": null,
    "shipment": null
  }
}
```

## Admin Update Order Status

| Field | Value |
| --- | --- |
| API name | Admin Update Order Status |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/orders/order_uuid/status` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Request body:

```json
{
  "status": "CONFIRMED"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/orders/order_uuid/status" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"status":"CONFIRMED"}'
```

Response:

```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "id": "order_uuid",
    "status": "CONFIRMED",
    "confirmedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

## Admin Cancel Order

| Field | Value |
| --- | --- |
| API name | Admin Cancel Order |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/orders/order_uuid/cancel` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Request body:

```json
{
  "reason": "Customer requested"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/orders/order_uuid/cancel" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"reason":"Customer requested"}'
```

Response:

```json
{
  "success": true,
  "message": "Order cancelled successfully",
  "data": {
    "id": "order_uuid",
    "status": "CANCELLED",
    "cancellationReason": "Customer requested",
    "cancelledAt": "2026-07-05T10:00:00.000Z"
  }
}
```

## Admin Payment List

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

## Admin Payment Detail

| Field | Value |
| --- | --- |
| API name | Admin Payment Detail |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/payments/payment_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/payments/payment_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": {
    "id": "payment_uuid",
    "orderId": "order_uuid",
    "provider": "RAZORPAY",
    "status": "SUCCESS",
    "amount": "1798",
    "currency": "INR",
    "order": {
      "id": "order_uuid",
      "orderNumber": "ORD-001",
      "customer": { "id": "customer_user_uuid" },
      "vendor": { "businessName": "Happy Paws Store" },
      "items": []
    }
  }
}
```

## Admin Refund

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
