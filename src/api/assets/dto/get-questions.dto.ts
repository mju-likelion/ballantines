import { IsIn } from 'class-validator';

export class Part {
  @IsIn(['web', 'server', 'design'])
  part: string;
}
