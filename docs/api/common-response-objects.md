## Common Full Response Objects

### User

```json
{
  "id": "user_uuid",
  "email": "user@example.com",
  "phoneNumber": "+919999999999",
  "passwordHash": "$2b$12$redacted",
  "role": "CUSTOMER",
  "status": "ACTIVE",
  "lastLoginAt": "2026-07-05T10:00:00.000Z",
  "createdAt": "2026-07-05T10:00:00.000Z",
  "updatedAt": "2026-07-05T10:00:00.000Z",
  "deletedAt": null
}
```

### Pet

```json
{
  "id": "pet_uuid",
  "ownerId": "user_uuid",
  "name": "Bruno",
  "species": "DOG",
  "breed": "Labrador",
  "gender": "MALE",
  "dateOfBirth": "2022-01-01T00:00:00.000Z",
  "weight": "24.50",
  "color": "Golden",
  "microchipNumber": "MC123456",
  "profileImageUrl": null,
  "passportNumber": null,
  "isActive": true,
  "createdAt": "2026-07-05T10:00:00.000Z",
  "updatedAt": "2026-07-05T10:00:00.000Z",
  "deletedAt": null
}
```

### Vendor Profile

```json
{
  "id": "vendor_uuid",
  "userId": "user_uuid",
  "businessName": "Happy Paws Store",
  "contactPerson": "Amit",
  "email": "vendor@example.com",
  "phoneNumber": "+919999999998",
  "gstNumber": "27ABCDE1234F1Z5",
  "panNumber": "ABCDE1234F",
  "address": null,
  "city": null,
  "state": null,
  "pincode": null,
  "status": "APPROVED",
  "rejectionReason": null,
  "createdAt": "2026-07-05T10:00:00.000Z",
  "updatedAt": "2026-07-05T10:00:00.000Z",
  "deletedAt": null
}
```

### Product

```json
{
  "id": "product_uuid",
  "vendorId": "vendor_uuid",
  "categoryId": "category_uuid",
  "name": "Premium Dog Food",
  "sku": "DOG-FOOD-001",
  "description": "High-protein dog food",
  "price": "999.00",
  "discountPrice": "899.00",
  "petType": "DOG",
  "status": "ACTIVE",
  "isFeatured": false,
  "createdAt": "2026-07-05T10:00:00.000Z",
  "updatedAt": "2026-07-05T10:00:00.000Z",
  "deletedAt": null,
  "images": [
    {
      "id": "image_uuid",
      "productId": "product_uuid",
      "url": "https://cdn.example.com/dog-food.webp",
      "sortOrder": 0,
      "createdAt": "2026-07-05T10:00:00.000Z"
    }
  ],
  "inventory": {
    "id": "inventory_uuid",
    "productId": "product_uuid",
    "stock": 100,
    "reserved": 2,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

### Order

```json
{
  "id": "order_uuid",
  "customerId": "user_uuid",
  "vendorId": "vendor_uuid",
  "status": "PLACED",
  "totalAmount": "1798.00",
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
      "unitPrice": "899.00",
      "createdAt": "2026-07-05T10:00:00.000Z"
    }
  ],
  "payment": null,
  "shipment": null
}
```
