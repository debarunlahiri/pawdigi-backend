# Catalog and Commerce APIs

Filtered customer endpoints from `catalog-and-commerce.md`.

## Get Cart

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

## Add Cart Item

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

## Update Cart Item

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

## Remove Cart Item

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

## Clear Cart

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

## Create Order

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

## List Customer Orders

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

## Get Customer Order

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

## Cancel Order

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

## Create Payment

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

## Verify Payment

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
