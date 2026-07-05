import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  slug?: string;
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
