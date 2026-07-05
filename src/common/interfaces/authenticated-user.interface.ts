import { Role } from '@prisma/client';

export interface AuthenticatedUser {
  id: string;
  role: Role;
  email?: string | null;
  vendorId?: string;
  sessionId?: string;
}
