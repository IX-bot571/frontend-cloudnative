k# Frontend Cloud Native - Angular

Aplicacion Angular 22 con login mediante Keycloak (IDaaS), JWT adjunto a las llamadas al backend, y vistas para crear y listar pedidos.

## Requisitos
- Node 20.19+ y Angular CLI
- Backend levantado (ver repositorio `backend-cloudnative`): Keycloak en `localhost:8080` y `ms-pedidos` en `localhost:8081`

## Puesta en marcha
```bash
npm install
ng serve
```
Abrir http://localhost:4200. La app redirige al login de Keycloak (realm `cloudnative`, cliente `angular-app`).

## Estructura
- `auth.service.ts`: login con Keycloak (PKCE S256) y obtencion del JWT
- `auth.interceptor.ts`: adjunta `Authorization: Bearer <JWT>` a las llamadas a `ms-pedidos`
- `pedido.service.ts`: llamadas HTTP (`POST` y `GET /api/pedidos`)
- `pedido-crear.ts` y `pedido-lista.ts`: vistas de crear pedido y listado

## Flujo
Al crear un pedido, `ms-pedidos` lo guarda en la BD y publica un mensaje en RabbitMQ; `ms-notificaciones` lo consume de forma asincrona.
