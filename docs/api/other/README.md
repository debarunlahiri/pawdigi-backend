# Other APIs

Other APIs are public, shared, webhook, or documentation-related endpoints that do not belong only to customer, admin, or vendor flows.

## Public Catalog and Reviews

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Category List | `GET` | `/api/v1/categories` | [Catalog and Commerce](catalog-and-commerce.md#public-category-list) |
| Product List | `GET` | `/api/v1/products` | [Catalog and Commerce](catalog-and-commerce.md#public-product-list) |
| Product Detail | `GET` | `/api/v1/products/{id}` | [Catalog and Commerce](catalog-and-commerce.md#public-product-detail) |
| Product Reviews | `GET` | `/api/v1/reviews/products/{productId}` | [Reviews](reviews.md#product-reviews) |

## Public Sharing

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Public Passport | `GET` | `/api/v1/public/passport/{token}` | [Pet Passports](pet-passports.md#public-passport) |

## Webhooks and System

| API | Method | URL | Details |
| --- | --- | --- | --- |
| Razorpay Webhook | `POST` | `/api/v1/payments/webhook` | [Catalog and Commerce](catalog-and-commerce.md#razorpay-webhook) |
| Swagger UI | `GET` | `/api/docs` | [Overview](../overview.md) |

## Shared References

- [Common Response Objects](../common-response-objects.md)
- [API Overview](../overview.md)
