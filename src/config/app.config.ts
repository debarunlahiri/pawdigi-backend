import { registerAs } from '@nestjs/config';

const listFromCsv = (value?: string) =>
  (value ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

export default registerAs('app', () => ({
  env: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  apiPrefix: process.env.API_PREFIX ?? 'api',
  corsOrigins: Array.from(
    new Set([
      ...listFromCsv(process.env.CORS_ORIGINS),
      ...listFromCsv(process.env.ADMIN_PANEL_ORIGIN),
      ...listFromCsv(process.env.VENDOR_PANEL_ORIGIN),
    ]),
  ),
}));
