import { PartialType } from '@nestjs/swagger';
import { CreateDewormingDto } from './create-deworming.dto';

export class UpdateDewormingDto extends PartialType(CreateDewormingDto) {}
