import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  private readonly memory = new Map<string, { value: unknown; expiresAt?: number }>();

  get<T>(key: string): T | undefined {
    const item = this.memory.get(key);
    if (!item) return undefined;
    if (item.expiresAt && item.expiresAt < Date.now()) {
      this.memory.delete(key);
      return undefined;
    }
    return item.value as T;
  }

  set(key: string, value: unknown, ttlSeconds?: number) {
    this.memory.set(key, { value, expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined });
  }
}
