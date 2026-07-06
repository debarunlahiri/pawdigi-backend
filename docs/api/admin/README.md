# Admin APIs

Admin endpoints use the `/admin/...` prefix unless noted. Detailed request bodies, curl examples, and full responses remain in the linked module files below.

## Authentication

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Admin Login | `POST` | `/api/v1/admin/auth/login` | [Auth](auth.md#admin-login) |
| Refresh Token | `POST` | `/api/v1/admin/auth/refresh-token` | [Auth](auth.md#admin-refresh-token) |
| Logout | `POST` | `/api/v1/admin/auth/logout` | [Auth](auth.md#admin-logout) |
| Current Admin | `GET` | `/api/v1/admin/auth/me` | [Auth](auth.md#admin-me) |

## Dashboard, Users, Customers, Admins, Pets, Reports

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Dashboard Counts | `GET` | `/api/v1/admin/dashboard` | [Admin Details](management.md#admin-dashboard-counts) |
| List Users | `GET` | `/api/v1/admin/users` | [Admin Details](management.md#list-users) |
| Create User | `POST` | `/api/v1/admin/users` | [Admin Details](management.md#create-user) |
| Get User | `GET` | `/api/v1/admin/users/{id}` | [Admin Details](management.md#get-user) |
| Update User | `PATCH` | `/api/v1/admin/users/{id}` | [Admin Details](management.md#update-user) |
| Block User | `PATCH` | `/api/v1/admin/users/{id}/block` | [Admin Details](management.md#block-user) |
| Unblock User | `PATCH` | `/api/v1/admin/users/{id}/unblock` | [Admin Details](management.md#unblock-user) |
| List Customers | `GET` | `/api/v1/admin/customers` | [Admin Details](management.md#list-customers) |
| Get Customer | `GET` | `/api/v1/admin/customers/{id}` | [Admin Details](management.md#get-customer) |
| Update Customer | `PATCH` | `/api/v1/admin/customers/{id}` | [Admin Details](management.md#update-customer) |
| List Admins | `GET` | `/api/v1/admin/admins` | [Admin Details](management.md#list-admins) |
| Create Admin | `POST` | `/api/v1/admin/admins` | [Admin Details](management.md#create-admin) |
| Update Admin | `PATCH` | `/api/v1/admin/admins/{id}` | [Admin Details](management.md#update-admin) |
| List Pets | `GET` | `/api/v1/admin/pets` | [Admin Details](management.md#list-pets) |
| Get Pet | `GET` | `/api/v1/admin/pets/{id}` | [Admin Details](management.md#get-pet) |
| Update Pet | `PATCH` | `/api/v1/admin/pets/{id}` | [Admin Details](management.md#update-pet) |
| Delete Pet | `DELETE` | `/api/v1/admin/pets/{id}` | [Admin Details](management.md#delete-pet) |
| User Report | `GET` | `/api/v1/admin/reports/users` | [Admin Details](management.md#user-report) |
| Order Report | `GET` | `/api/v1/admin/reports/orders` | [Admin Details](management.md#order-report) |
| Vendor Report | `GET` | `/api/v1/admin/reports/vendors` | [Admin Details](management.md#vendor-report) |
| Revenue Report | `GET` | `/api/v1/admin/reports/revenue` | [Admin Details](management.md#revenue-report) |
| Product Report | `GET` | `/api/v1/admin/reports/products` | [Admin Details](management.md#product-report) |
| Audit Logs | `GET` | `/api/v1/admin/audit-logs` | [Admin Details](management.md#audit-log-list) |
| Audit Log Detail | `GET` | `/api/v1/admin/audit-logs/{id}` | [Admin Details](management.md#audit-log-detail) |

## Catalog, Orders, Payments, Vendors, Shipments, Reviews, Logs

| API | Method | URL | Details |
| --- | --- | --- | --- |
| List Categories | `GET` | `/api/v1/admin/categories` | [Catalog](catalog-and-commerce.md#admin-category-list) |
| Create Category | `POST` | `/api/v1/admin/categories` | [Catalog](catalog-and-commerce.md#admin-create-category) |
| Update Category | `PATCH` | `/api/v1/admin/categories/{id}` | [Catalog](catalog-and-commerce.md#admin-update-category) |
| Delete Category | `DELETE` | `/api/v1/admin/categories/{id}` | [Catalog](catalog-and-commerce.md#admin-delete-category) |
| Product List | `GET` | `/api/v1/admin/products` | [Catalog](catalog-and-commerce.md#admin-product-list) |
| Product Detail | `GET` | `/api/v1/admin/products/{id}` | [Catalog](catalog-and-commerce.md#admin-product-detail) |
| Update Product | `PATCH` | `/api/v1/admin/products/{id}` | [Catalog](catalog-and-commerce.md#admin-update-product) |
| Approve Product | `PATCH` | `/api/v1/admin/products/{id}/approve` | [Catalog](catalog-and-commerce.md#admin-approve-product) |
| Reject Product | `PATCH` | `/api/v1/admin/products/{id}/reject` | [Catalog](catalog-and-commerce.md#admin-reject-product) |
| Delete Product | `DELETE` | `/api/v1/admin/products/{id}` | [Catalog](catalog-and-commerce.md#admin-delete-product) |
| Order List | `GET` | `/api/v1/admin/orders` | [Catalog](catalog-and-commerce.md#admin-order-list) |
| Order Detail | `GET` | `/api/v1/admin/orders/{id}` | [Catalog](catalog-and-commerce.md#admin-order-detail) |
| Update Order Status | `PATCH` | `/api/v1/admin/orders/{id}/status` | [Catalog](catalog-and-commerce.md#admin-update-order-status) |
| Cancel Order | `PATCH` | `/api/v1/admin/orders/{id}/cancel` | [Catalog](catalog-and-commerce.md#admin-cancel-order) |
| Payment List | `GET` | `/api/v1/admin/payments` | [Catalog](catalog-and-commerce.md#admin-payment-list) |
| Payment Detail | `GET` | `/api/v1/admin/payments/{id}` | [Catalog](catalog-and-commerce.md#admin-payment-detail) |
| Refund Payment | `POST` | `/api/v1/admin/payments/refund` | [Catalog](catalog-and-commerce.md#admin-refund) |
| Vendor List | `GET` | `/api/v1/admin/vendors` | [Vendors](vendors.md#admin-vendor-list) |
| Vendor Detail | `GET` | `/api/v1/admin/vendors/{id}` | [Vendors](vendors.md#admin-vendor-detail) |
| Approve Vendor | `PATCH` | `/api/v1/admin/vendors/{id}/approve` | [Vendors](vendors.md#admin-approve-vendor) |
| Reject Vendor | `PATCH` | `/api/v1/admin/vendors/{id}/reject` | [Vendors](vendors.md#admin-reject-vendor) |
| Suspend Vendor | `PATCH` | `/api/v1/admin/vendors/{id}/suspend` | [Vendors](vendors.md#admin-suspend-vendor) |
| Reactivate Vendor | `PATCH` | `/api/v1/admin/vendors/{id}/reactivate` | [Vendors](vendors.md#admin-reactivate-vendor) |
| Shipment List | `GET` | `/api/v1/admin/shipments` | [Shipments](shipments.md#admin-shipment-list) |
| Shipment Detail | `GET` | `/api/v1/admin/shipments/{id}` | [Shipments](shipments.md#admin-shipment-detail) |
| Create Shipment | `POST` | `/api/v1/admin/shipments` | [Shipments](shipments.md#admin-create-shipment) |
| Update Shipment | `PATCH` | `/api/v1/admin/shipments/{id}` | [Shipments](shipments.md#admin-update-shipment) |
| Review List | `GET` | `/api/v1/admin/reviews` | [Reviews](reviews.md#admin-review-list) |
| Moderate Review | `PATCH` | `/api/v1/admin/reviews/{id}/moderate` | [Reviews](reviews.md#admin-moderate-review) |
| API Logs | `GET` | `/api/v1/admin/api-logs` | [API Logs](api-logs.md#list-api-request-logs) |
| Scheduler Logs | `GET` | `/api/v1/admin/scheduler-logs` | [Scheduler Logs](scheduler-logs.md#list-scheduler-logs) |
| Scheduler Log Detail | `GET` | `/api/v1/admin/scheduler-logs/{id}` | [Scheduler Logs](scheduler-logs.md#get-scheduler-log) |

## Pet Passports, Vaccinations, Inventory, Notifications

| API | Method | URL | Details |
| --- | --- | --- | --- |
| List Pet Passports | `GET` | `/api/v1/admin/pet-passports` | [Pet Passports](pet-passports.md#admin-pet-passport-list) |
| Pet Passport Detail | `GET` | `/api/v1/admin/pet-passports/{id}` | [Pet Passports](pet-passports.md#admin-pet-passport-detail) |
| Generate Passport | `POST` | `/api/v1/admin/pet-passports/{petId}/generate` | [Pet Passports](pet-passports.md#admin-generate-passport) |
| Revoke Passport Share | `PATCH` | `/api/v1/admin/pet-passports/{id}/revoke` | [Pet Passports](pet-passports.md#admin-revoke-passport) |
| List Vaccinations | `GET` | `/api/v1/admin/vaccinations` | [Vaccinations](vaccinations.md#admin-vaccination-list) |
| Vaccination Detail | `GET` | `/api/v1/admin/vaccinations/{id}` | [Vaccinations](vaccinations.md#admin-vaccination-detail) |
| Create Vaccination | `POST` | `/api/v1/admin/vaccinations` | [Vaccinations](vaccinations.md#admin-create-vaccination) |
| Update Vaccination | `PATCH` | `/api/v1/admin/vaccinations/{id}` | [Vaccinations](vaccinations.md#admin-update-vaccination) |
| Delete Vaccination | `DELETE` | `/api/v1/admin/vaccinations/{id}` | [Vaccinations](vaccinations.md#admin-delete-vaccination) |
| List Inventory | `GET` | `/api/v1/admin/inventory` | [Inventory](inventory.md#admin-inventory-list) |
| Inventory Detail | `GET` | `/api/v1/admin/inventory/{productId}` | [Inventory](inventory.md#admin-inventory-detail) |
| Update Inventory | `PATCH` | `/api/v1/admin/inventory/{productId}` | [Inventory](inventory.md#admin-update-inventory) |
| List Notifications | `GET` | `/api/v1/admin/notifications` | [Notifications](notifications.md#admin-notification-list) |
| Notification Detail | `GET` | `/api/v1/admin/notifications/{id}` | [Notifications](notifications.md#admin-notification-detail) |
| Send Notification | `POST` | `/api/v1/admin/notifications` | [Notifications](notifications.md#admin-send-notification) |
| Retry Notification | `POST` | `/api/v1/admin/notifications/{id}/retry` | [Notifications](notifications.md#admin-retry-notification) |

## System Settings

| API | Method | URL | Details |
| --- | --- | --- | --- |
| List Settings | `GET` | `/api/v1/admin/settings` | [Settings](settings.md#admin-settings-list) |
| Update Rate Limits | `PATCH` | `/api/v1/admin/settings/rate-limits` | [Settings](settings.md#admin-update-rate-limits) |
