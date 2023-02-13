import { IsIn, IsString } from 'class-validator';

type Parts = 'web' | 'server' | 'design';

export class Part {
  @IsString({ message: 'INVALID_PART_NAME' })
  @IsIn(['web', 'server', 'design'], { message: 'INVALID_PART_NAME' })
  part: Parts;
}
