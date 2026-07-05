# Shipment APIs

### Vendor Create Shipment

| Field | Value |
| --- | --- |
| API name | Vendor Create Shipment |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/vendor/shipments` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR |

Path/query params:

```json
{}
```

Request body:

```json
{
  "orderId": "order_uuid",
  "carrier": "BlueDart",
  "trackingNumber": "BD123",
  "trackingUrl": "https://track.example.com/BD123"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/vendor/shipments" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"orderId":"order_uuid","carrier":"BlueDart","trackingNumber":"BD123","trackingUrl":"https://track.example.com/BD123"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "shipment_uuid",
    "orderId": "order_uuid",
    "status": "PENDING",
    "carrier": "BlueDart",
    "trackingNumber": "BD123",
    "trackingUrl": "https://track.example.com/BD123",
    "shippedAt": null,
    "deliveredAt": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

### Vendor Update Shipment Status

| Field | Value |
| --- | --- |
| API name | Vendor Update Shipment Status |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/vendor/shipments/order_uuid/status` |
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
  "status": "SHIPPED"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/vendor/shipments/order_uuid/status" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"status":"SHIPPED"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "shipment_uuid",
    "orderId": "order_uuid",
    "status": "SHIPPED",
    "carrier": "BlueDart",
    "trackingNumber": "BD123",
    "trackingUrl": "https://track.example.com/BD123",
    "shippedAt": "2026-07-05T10:00:00.000Z",
    "deliveredAt": null,
    "createdAt": "2026-07-05T10:00:00.000Z",
    "updatedAt": "2026-07-05T10:00:00.000Z"
  }
}
```

### Admin Shipment List

| Field | Value |
| --- | --- |
| API name | Admin Shipment List |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/shipments?page=1&limit=20&status=PENDING` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Path/query params:

```json
{
  "page": 1,
  "limit": 20,
  "status": "PENDING"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/shipments?page=1&limit=20&status=PENDING" \
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
        "id": "shipment_uuid",
        "orderId": "order_uuid",
        "status": "PENDING",
        "carrier": "BlueDart",
        "trackingNumber": "BD123",
        "trackingUrl": "https://track.example.com/BD123",
        "shippedAt": null,
        "deliveredAt": null,
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

