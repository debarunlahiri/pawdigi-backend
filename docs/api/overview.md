# API Overview

Base URL:

```txt
http://localhost:3000/api/v1
```

Swagger URL:

```txt
http://localhost:3000/api/docs
```

## Conventions

Use these placeholders in curl commands:

```txt
CUSTOMER_ACCESS_TOKEN=<customer-jwt-access-token>
ADMIN_ACCESS_TOKEN=<admin-jwt-access-token>
VENDOR_ACCESS_TOKEN=<vendor-jwt-access-token>
```

All normal responses are wrapped by the global response interceptor:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Errors use:

```json
{
  "success": false,
  "message": "Validation failed",
  "errorCode": "VALIDATION_ERROR",
  "errors": [
    "field must be a string"
  ]
}
```

## Category Index

- [Customer APIs](customer/README.md): mobile customer authentication, profile, pets, health records, guardians, passports, cart, orders, payments, reviews, reminders, notifications, and documents.
- [Admin APIs](admin/README.md): admin authentication, dashboard, users, customers, admins, pets, vendors, categories, products, orders, payments, shipments, reviews, reports, API logs, scheduler logs, and audit logs.
- [Vendor APIs](vendor/README.md): vendor registration/login, profile, KYC, products, inventory, orders, shipments, and reports.
- [Other APIs](other/README.md): public catalog, public reviews, public shared passports, payment webhooks, shared response objects, and Swagger.
