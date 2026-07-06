# Shipment APIs

Filtered admin endpoints from `shipments.md`.

## Admin Shipment List

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

## Admin Shipment Detail

| Field | Value |
| --- | --- |
| API name | Admin Shipment Detail |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/admin/shipments/shipment_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/admin/shipments/shipment_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": {
    "id": "shipment_uuid",
    "orderId": "order_uuid",
    "status": "PENDING",
    "carrier": "BlueDart",
    "trackingNumber": "BD123",
    "trackingUrl": "https://track.aftership.com/BlueDart/BD123",
    "order": {
      "id": "order_uuid",
      "orderNumber": "ORD-001",
      "customer": { "id": "customer_user_uuid" },
      "vendor": { "businessName": "Happy Paws Store" }
    }
  }
}
```

## Admin Create Shipment

| Field | Value |
| --- | --- |
| API name | Admin Create Shipment |
| Method | `POST` |
| Full URL | `http://localhost:3000/api/v1/admin/shipments` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Request body:

```json
{
  "orderId": "order_uuid",
  "carrier": "BlueDart",
  "trackingNumber": "BD123"
}
```

Curl:

```bash
curl -X POST "http://localhost:3000/api/v1/admin/shipments" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"orderId":"order_uuid","carrier":"BlueDart","trackingNumber":"BD123"}'
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "shipment_uuid",
    "orderId": "order_uuid",
    "carrier": "BlueDart",
    "trackingNumber": "BD123",
    "trackingUrl": "https://track.aftership.com/BlueDart/BD123"
  }
}
```

## Admin Update Shipment

| Field | Value |
| --- | --- |
| API name | Admin Update Shipment |
| Method | `PATCH` |
| Full URL | `http://localhost:3000/api/v1/admin/shipments/shipment_uuid` |
| Auth | Bearer $ADMIN_ACCESS_TOKEN |
| Roles | ADMIN or SUPER_ADMIN |

Request body:

```json
{
  "status": "IN_TRANSIT",
  "trackingUrl": "https://track.example.com/BD123"
}
```

Curl:

```bash
curl -X PATCH "http://localhost:3000/api/v1/admin/shipments/shipment_uuid" \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"status":"IN_TRANSIT","trackingUrl":"https://track.example.com/BD123"}'
```

Response:

```json
{
  "success": true,
  "message": "Shipment updated successfully",
  "data": {
    "id": "shipment_uuid",
    "status": "IN_TRANSIT",
    "shippedAt": "2026-07-05T10:00:00.000Z"
  }
}
```
