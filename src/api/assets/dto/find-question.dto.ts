import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

type Parts = 'web' | 'server' | 'design';

export class Part {
  @ApiProperty({
    example: 'web',
    description: '지원 희망 파트',
  })
  @IsString({ message: 'INVALID_PART_NAME' })
  @IsIn(['web', 'server', 'design'], { message: 'INVALID_PART_NAME' })
  part: Parts;
}
