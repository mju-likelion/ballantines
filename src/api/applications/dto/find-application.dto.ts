import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class PagenationOptions {
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsString()
  @IsIn(['web', 'server', 'design'])
  part?: 'web' | 'server' | 'design';

  @IsOptional()
  @IsString()
  @IsIn(['name_asc', 'createdDate_asc', 'name_desc', 'createdDate_desc'])
  sort?: string;
}
