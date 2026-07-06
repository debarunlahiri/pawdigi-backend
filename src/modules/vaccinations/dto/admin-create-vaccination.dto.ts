import { IsUUID } from 'class-validator';
import { CreateVaccinationDto } from './create-vaccination.dto';

export class AdminCreateVaccinationDto extends CreateVaccinationDto {
  @IsUUID()
  petId: string;
}
