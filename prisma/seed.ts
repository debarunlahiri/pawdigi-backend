import { PrismaClient, Role, UserStatus, VendorStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL ?? 'superadmin@pawdigi.local';
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD ?? 'ChangeMe123!';

  await prisma.user.upsert({
    where: { email: superAdminEmail },
    update: {},
    create: {
      email: superAdminEmail,
      passwordHash: await bcrypt.hash(superAdminPassword, 12),
      role: Role.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      adminProfile: { create: { name: 'Super Admin' } },
    },
  });

  for (const category of ['Food', 'Grooming', 'Health', 'Toys', 'Accessories']) {
    await prisma.category.upsert({
      where: { slug: category.toLowerCase() },
      update: {},
      create: { name: category, slug: category.toLowerCase() },
    });
  }

  const vendorEmail = 'vendor@pawdigi.local';
  await prisma.user.upsert({
    where: { email: vendorEmail },
    update: {},
    create: {
      email: vendorEmail,
      passwordHash: await bcrypt.hash('Vendor123!', 12),
      role: Role.VENDOR,
      status: UserStatus.ACTIVE,
      vendorProfile: { create: { businessName: 'Sample Vendor', email: vendorEmail, status: VendorStatus.APPROVED } },
    },
  });
}

main().finally(async () => prisma.$disconnect());
