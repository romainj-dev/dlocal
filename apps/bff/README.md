# BFF/API Gateway

The BFF aggregates data required by the micro-frontends into a single API surface. The shell or MFEs can call the BFF to fetch consolidated data instead of hitting multiple downstream services directly.

## Example

- `GET /api/dashboard/summary` returns a consolidated payload with the current state for payments, risk, merchant onboarding, and reporting modules.
- `GET /health` returns the service health payload for monitoring.

In production, this app would proxy requests to internal services and apply shared auth, caching, and observability logic before returning responses to the frontend.
