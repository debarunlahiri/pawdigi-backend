# Vendor APIs

Vendor APIs are used by vendor portal clients. Use `VENDOR_ACCESS_TOKEN` for protected endpoints.

## Authentication

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Register | `POST` | `/api/v1/vendor/auth/register` | [Auth](auth.md#vendor-register) |
| Login | `POST` | `/api/v1/vendor/auth/login` | [Auth](auth.md#vendor-login) |
| Refresh Token | `POST` | `/api/v1/vendor/auth/refresh-token` | [Auth](auth.md#vendor-refresh-token) |
| Logout | `POST` | `/api/v1/vendor/auth/logout` | [Auth](auth.md#vendor-logout) |
| Current Vendor | `GET` | `/api/v1/vendor/auth/me` | [Auth](auth.md#vendor-me) |

## Profile and KYC

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Get Vendor Profile | `GET` | `/api/v1/vendor/profile` | [Vendors](vendors.md#get-vendor-profile) |
| Update Vendor Profile | `PATCH` | `/api/v1/vendor/profile` | [Vendors](vendors.md#update-vendor-profile) |
| Submit Vendor KYC | `POST` | `/api/v1/vendor/kyc` | [Vendors](vendors.md#submit-vendor-kyc) |

## Products and Inventory

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Product List | `GET` | `/api/v1/vendor/products` | [Catalog and Commerce](catalog-and-commerce.md#vendor-product-list) |
| Create Product | `POST` | `/api/v1/vendor/products` | [Catalog and Commerce](catalog-and-commerce.md#vendor-create-product) |
| Update Product | `PATCH` | `/api/v1/vendor/products/{id}` | [Catalog and Commerce](catalog-and-commerce.md#vendor-update-product) |
| Delete Product | `DELETE` | `/api/v1/vendor/products/{id}` | [Catalog and Commerce](catalog-and-commerce.md#vendor-delete-product) |
| Update Inventory | `PATCH` | `/api/v1/vendor/inventory/{productId}` | [Catalog and Commerce](catalog-and-commerce.md#vendor-update-inventory) |

## Orders, Shipments, Reports

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Order List | `GET` | `/api/v1/vendor/orders` | [Catalog and Commerce](catalog-and-commerce.md#vendor-order-list) |
| Update Order Status | `PATCH` | `/api/v1/vendor/orders/{id}/status` | [Catalog and Commerce](catalog-and-commerce.md#vendor-update-order-status) |
| Create Shipment | `POST` | `/api/v1/vendor/shipments` | [Shipments](shipments.md#vendor-create-shipment) |
| Update Shipment Status | `PATCH` | `/api/v1/vendor/shipments/{orderId}/status` | [Shipments](shipments.md#vendor-update-shipment-status) |
| Summary Report | `GET` | `/api/v1/vendor/reports/summary` | [Admin](reports.md#vendor-summary-report) |
