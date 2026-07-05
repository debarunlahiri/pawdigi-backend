import { Type } from 'class-transformer';
import { IsArray, IsInt, IsObject, IsUUID, Min, ValidateNested } from 'class-validator';

class CreateOrderItemDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @IsObject()
  address: Record<string, unknown>;
}
