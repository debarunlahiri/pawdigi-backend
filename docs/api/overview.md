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
