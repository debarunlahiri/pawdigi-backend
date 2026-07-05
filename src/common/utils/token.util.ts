import { randomBytes } from 'crypto';

export const randomToken = (bytes = 32) => randomBytes(bytes).toString('hex');
