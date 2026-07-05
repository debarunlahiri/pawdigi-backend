import { registerAs } from '@nestjs/config';

export default registerAs('cors', () => ({
  adminOrigin: process.env.ADMIN_PANEL_ORIGIN,
  vendorOrigin: process.env.VENDOR_PANEL_ORIGIN,
  origins: (process.env.CORS_ORIGINS ?? '').split(',').map((origin) => origin.trim()).filter(Boolean),
}));
