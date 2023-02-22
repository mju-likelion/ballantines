import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export enum Part {
  web = 'web',
  server = 'server',
  design = 'design',
}

export enum SortOptions {
  name_asc = 'name_asc',
  name_desc = 'name_desc',
  createdDate_asc = 'createdDate_asc',
  createdDate_desc = 'createdDate_desc',
}
//위처럼 enum이 더 깔끔할 거 같은데 이걸 consts나 type 파일을 만들까요? 아니면 여기 둘까요?

export class PaginationQueryDTO {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @IsOptional()
  @IsString()
  @IsEnum(Part)
  part?: Part;

  @IsOptional()
  @IsString()
  @IsEnum(SortOptions)
  sort?: SortOptions = SortOptions.createdDate_asc;
}
