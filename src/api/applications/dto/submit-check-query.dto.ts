import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SubmitCheckQueryDto {
  @ApiProperty()
  @Matches(/^60[0-9]{6}$/)
  sid: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  name: string;
}
