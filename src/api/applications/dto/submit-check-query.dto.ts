import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SubmitCheckQueryDto {
  @Matches(/^60[0-9]{6}$/)
  sid: string;

  @IsString()
  @MinLength(2)
  @MaxLength(10)
  name: string;
}
