import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { getTheBegginingOfDay, getTheEndOfDay } from 'src/shared/utils';
import {
  getTheBegginingOfDay1,
  getTheEndOfDay1,
} from 'src/shared/utils/date-time';

export class CreateProductDTO {
  @IsNotEmpty()
  @Transform(({ value }) => getTheBegginingOfDay1(value))
  begin: string;

  @IsNotEmpty()
  @Transform(({ value }) => getTheEndOfDay1(value))
  end: string;
}
