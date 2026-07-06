# Vendor Report APIs

Filtered vendor report endpoints from `admin.md`.

## Vendor Summary Report

| Field | Value |
| --- | --- |
| API name | Vendor Summary Report |
| Method | `GET` |
| Full URL | `http://localhost:3000/api/v1/vendor/reports/summary?from=2026-07-01&to=2026-07-05` |
| Auth | Bearer $VENDOR_ACCESS_TOKEN |
| Roles | VENDOR |

Path/query params:

```json
{
  "from": "2026-07-01",
  "to": "2026-07-05"
}
```

Request body:

```json
{}
```

Curl:

```bash
curl -X GET "http://localhost:3000/api/v1/vendor/reports/summary?from=2026-07-01&to=2026-07-05" \
  -H "Authorization: Bearer $VENDOR_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "orders": 7,
    "revenue": "35000",
    "products": 12,
    "lowStockProducts": 2,
    "from": "2026-07-01",
    "to": "2026-07-05"
  }
}
```
