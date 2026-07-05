import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { UpdateCustomerProfileDto } from '../dto/update-customer-profile.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  profile(userId: string) {
    return this.prisma.customerProfile.findUnique({ where: { userId }, include: { user: true } });
  }

  updateProfile(userId: string, dto: UpdateCustomerProfileDto) {
    return this.prisma.customerProfile.upsert({
      where: { userId },
      update: dto,
      create: { userId, ...dto },
    });
  }
}
