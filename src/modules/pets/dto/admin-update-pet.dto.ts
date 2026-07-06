import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { PetGender, PetSpecies } from '@prisma/client';

export class AdminUpdatePetDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(PetSpecies)
  species?: PetSpecies;

  @IsOptional()
  @IsString()
  breed?: string;

  @IsOptional()
  @IsEnum(PetGender)
  gender?: PetGender;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  microchipNumber?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
