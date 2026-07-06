# Customer APIs

Customer APIs are used by the mobile customer app. Use `CUSTOMER_ACCESS_TOKEN` for protected endpoints.

## Authentication

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Request OTP | `POST` | `/api/v1/customer/auth/request-otp` | [Auth](auth.md#customer-request-otp) |
| Verify OTP | `POST` | `/api/v1/customer/auth/verify-otp` | [Auth](auth.md#customer-verify-otp) |

## Profile and Pets

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Get Customer Profile | `GET` | `/api/v1/customers/me` | [Customers and Pets](customers-and-pets.md#get-customer-profile) |
| Update Customer Profile | `PATCH` | `/api/v1/customers/me` | [Customers and Pets](customers-and-pets.md#update-customer-profile) |
| List Pets | `GET` | `/api/v1/pets` | [Customers and Pets](customers-and-pets.md#list-pets) |
| Create Pet | `POST` | `/api/v1/pets` | [Customers and Pets](customers-and-pets.md#create-pet) |
| Get Pet | `GET` | `/api/v1/pets/{id}` | [Customers and Pets](customers-and-pets.md#get-pet) |
| Update Pet | `PATCH` | `/api/v1/pets/{id}` | [Customers and Pets](customers-and-pets.md#update-pet) |
| Delete Pet | `DELETE` | `/api/v1/pets/{id}` | [Customers and Pets](customers-and-pets.md#delete-pet) |

## Health Records

| API | Method | URL | Details |
| --- | --- | --- | --- |
| List Vaccinations | `GET` | `/api/v1/pets/{petId}/vaccinations` | [Health Records](health-records.md#list-vaccinations) |
| Create Vaccination | `POST` | `/api/v1/pets/{petId}/vaccinations` | [Health Records](health-records.md#create-vaccination) |
| Update Vaccination | `PATCH` | `/api/v1/vaccinations/{id}` | [Health Records](health-records.md#update-vaccination) |
| Delete Vaccination | `DELETE` | `/api/v1/vaccinations/{id}` | [Health Records](health-records.md#delete-vaccination) |
| List Deworming Records | `GET` | `/api/v1/pets/{petId}/deworming` | [Health Records](health-records.md#list-deworming-records) |
| Create Deworming Record | `POST` | `/api/v1/pets/{petId}/deworming` | [Health Records](health-records.md#create-deworming-record) |
| Update Deworming Record | `PATCH` | `/api/v1/deworming/{id}` | [Health Records](health-records.md#update-deworming-record) |
| Delete Deworming Record | `DELETE` | `/api/v1/deworming/{id}` | [Health Records](health-records.md#delete-deworming-record) |
| List Medical Records | `GET` | `/api/v1/pets/{petId}/medical-records` | [Health Records](health-records.md#list-medical-records) |
| Create Medical Record | `POST` | `/api/v1/pets/{petId}/medical-records` | [Health Records](health-records.md#create-medical-record) |
| Update Medical Record | `PATCH` | `/api/v1/medical-records/{id}` | [Health Records](health-records.md#update-medical-record) |
| Delete Medical Record | `DELETE` | `/api/v1/medical-records/{id}` | [Health Records](health-records.md#delete-medical-record) |

## Guardians and Pet Passports

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Invite Guardian | `POST` | `/api/v1/pets/{petId}/guardians/invite` | [Guardians](guardians.md#invite-guardian) |
| List Guardian Invitations | `GET` | `/api/v1/guardian/invitations` | [Guardians](guardians.md#list-guardian-invitations) |
| Accept Guardian Invitation | `POST` | `/api/v1/guardian/invitations/{id}/accept` | [Guardians](guardians.md#accept-guardian-invitation) |
| Update Guardian Permission | `PATCH` | `/api/v1/pets/{petId}/guardians/{guardianId}` | [Guardians](guardians.md#update-guardian-permission) |
| Revoke Guardian | `DELETE` | `/api/v1/pets/{petId}/guardians/{guardianId}` | [Guardians](guardians.md#revoke-guardian) |
| Get Pet Passport | `GET` | `/api/v1/pets/{petId}/passport` | [Pet Passports](pet-passports.md#get-pet-passport) |
| Generate Passport | `POST` | `/api/v1/pets/{petId}/passport/generate` | [Pet Passports](pet-passports.md#generate-passport) |
| Share Passport | `POST` | `/api/v1/pets/{petId}/passport/share` | [Pet Passports](pet-passports.md#share-passport) |
| Revoke Passport Share | `PATCH` | `/api/v1/passport/share/{id}/revoke` | [Pet Passports](pet-passports.md#revoke-passport-share) |

## Documents

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Create Signed Upload URL | `POST` | `/api/v1/documents/signed-upload-url` | [Documents](documents.md#create-signed-upload-url) |
| Confirm Upload | `POST` | `/api/v1/documents/confirm-upload` | [Documents](documents.md#confirm-upload) |
| Get Signed View URL | `GET` | `/api/v1/documents/{id}/signed-view-url` | [Documents](documents.md#get-signed-view-url) |
| Delete Document | `DELETE` | `/api/v1/documents/{id}` | [Documents](documents.md#delete-document) |

## Cart, Orders, Payments, Reviews

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Get Cart | `GET` | `/api/v1/cart` | [Catalog and Commerce](catalog-and-commerce.md#get-cart) |
| Add Cart Item | `POST` | `/api/v1/cart/items` | [Catalog and Commerce](catalog-and-commerce.md#add-cart-item) |
| Update Cart Item | `PATCH` | `/api/v1/cart/items/{id}` | [Catalog and Commerce](catalog-and-commerce.md#update-cart-item) |
| Remove Cart Item | `DELETE` | `/api/v1/cart/items/{id}` | [Catalog and Commerce](catalog-and-commerce.md#remove-cart-item) |
| Clear Cart | `DELETE` | `/api/v1/cart` | [Catalog and Commerce](catalog-and-commerce.md#clear-cart) |
| Create Order | `POST` | `/api/v1/orders` | [Catalog and Commerce](catalog-and-commerce.md#create-order) |
| List Orders | `GET` | `/api/v1/orders` | [Catalog and Commerce](catalog-and-commerce.md#list-customer-orders) |
| Get Order | `GET` | `/api/v1/orders/{id}` | [Catalog and Commerce](catalog-and-commerce.md#get-customer-order) |
| Cancel Order | `PATCH` | `/api/v1/orders/{id}/cancel` | [Catalog and Commerce](catalog-and-commerce.md#cancel-order) |
| Create Payment | `POST` | `/api/v1/payments/create` | [Catalog and Commerce](catalog-and-commerce.md#create-payment) |
| Verify Payment | `POST` | `/api/v1/payments/verify` | [Catalog and Commerce](catalog-and-commerce.md#verify-payment) |
| Create Review | `POST` | `/api/v1/reviews` | [Reviews](reviews.md#create-review) |
| Update Review | `PATCH` | `/api/v1/reviews/{id}` | [Reviews](reviews.md#update-review) |

## Reminders, Devices, Notifications

| API | Method | URL | Details |
| --- | --- | --- | --- |
| List Reminders | `GET` | `/api/v1/reminders` | [Reminders and Notifications](reminders-and-notifications.md#list-reminders) |
| Create Reminder | `POST` | `/api/v1/reminders` | [Reminders and Notifications](reminders-and-notifications.md#create-reminder) |
| Update Reminder | `PATCH` | `/api/v1/reminders/{id}` | [Reminders and Notifications](reminders-and-notifications.md#update-reminder) |
| Complete Reminder | `PATCH` | `/api/v1/reminders/{id}/complete` | [Reminders and Notifications](reminders-and-notifications.md#complete-reminder) |
| Cancel Reminder | `DELETE` | `/api/v1/reminders/{id}` | [Reminders and Notifications](reminders-and-notifications.md#cancel-reminder) |
| Register Device | `POST` | `/api/v1/devices/register` | [Reminders and Notifications](reminders-and-notifications.md#register-device) |
| Delete Device | `DELETE` | `/api/v1/devices/{id}` | [Reminders and Notifications](reminders-and-notifications.md#delete-device) |
| List Notifications | `GET` | `/api/v1/notifications` | [Reminders and Notifications](reminders-and-notifications.md#list-notifications) |
| Mark Notification Read | `PATCH` | `/api/v1/notifications/{id}/read` | [Reminders and Notifications](reminders-and-notifications.md#mark-notification-read) |
| Mark All Notifications Read | `PATCH` | `/api/v1/notifications/read-all` | [Reminders and Notifications](reminders-and-notifications.md#mark-all-notifications-read) |
