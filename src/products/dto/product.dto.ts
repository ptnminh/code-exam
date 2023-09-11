import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { getTheBegginingOfDay, getTheEndOfDay } from 'src/shared/utils';

export class CreateProductDTO {
  @IsNotEmpty()
  @Transform(({ value }) => getTheBegginingOfDay(value))
  begin: string;

  @IsNotEmpty()
  @Transform(({ value }) => getTheEndOfDay(value))
  end: string;
}
