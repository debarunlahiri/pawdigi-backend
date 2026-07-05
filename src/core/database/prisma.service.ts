import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { createUuidV7 } from '../../common/utils/id.util';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
    this.$use(async (params, next) => {
      if (params.action === 'create') this.assignIds(params.args?.data);
      if (params.action === 'createMany' && Array.isArray(params.args?.data)) {
        params.args.data.forEach((item: Record<string, unknown>) => this.assignIds(item));
      }
      if (params.action === 'upsert') this.assignIds(params.args?.create);
      return next(params);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private assignIds(data?: Prisma.JsonObject | Record<string, unknown>) {
    if (!data) return;
    if (!data.id) data.id = createUuidV7();
    for (const value of Object.values(data)) {
      if (!value || typeof value !== 'object') continue;
      const relation = value as Record<string, unknown>;
      if (relation.create && typeof relation.create === 'object') {
        if (Array.isArray(relation.create)) {
          relation.create.forEach((item) => this.assignIds(item as Record<string, unknown>));
        } else {
          this.assignIds(relation.create as Record<string, unknown>);
        }
      }
      const createManyData = (relation.createMany as Record<string, unknown> | undefined)?.data;
      if (Array.isArray(createManyData)) {
        createManyData.forEach((item) => this.assignIds(item as Record<string, unknown>));
      } else if (createManyData && typeof createManyData === 'object') {
        this.assignIds(createManyData as Record<string, unknown>);
      }
      const upsertCreate = (relation.upsert as Record<string, unknown> | undefined)?.create;
      if (upsertCreate && typeof upsertCreate === 'object') {
        this.assignIds(upsertCreate as Record<string, unknown>);
      }
    }
  }
}
