import { Type } from 'class-transformer';
import { Equals, IsEmail, IsIn, IsString, Matches, MaxLength, MinLength, ValidateNested } from 'class-validator';

class PersonalInfo {
  @IsString()
  @MinLength(2)
  /**
   * 대한민국 법적으로는 5글자가 최대이지만 예외케이스가 있어서 안전하게 10글자로 커트
   */
  @MaxLength(10)
  readonly name: string;

  @Matches(/^010\d{8}$/)
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  /**
   * https://www.mju.ac.kr/mjukr/113/subview.do 에 있는 학과 이름을 기준으로 함
   */
  @Matches(/^[가-힣]{2,11}$/)
  readonly major: string;

  @Matches(/^\d{8}$/)
  readonly sid: string;

  @IsIn(['1', '2', '3', '4'])
  readonly grade: '1' | '2' | '3' | '4';

  @IsIn(['enrolled', 'tookOff', 'postponed'])
  readonly enrollmentStatus: 'enrolled' | 'tookOff' | 'postponed';

  @IsIn(['web', 'server', 'design'])
  readonly part: 'web' | 'server' | 'design';

  @Equals(true)
  readonly personalInfoAgreement: true;
}

class ApplicationInfo {
  // 문항은 최대 6개일 것이라고 가정하고 진행
  @IsString()
  @MaxLength(1000)
  readonly firstAnswer: string;

  @IsString()
  @MaxLength(1000)
  readonly secondAnswer: string;

  @IsString()
  @MaxLength(1000)
  readonly thirdAnswer: string;

  @IsString()
  @MaxLength(1000)
  readonly fourthAnswer: string;

  @IsString()
  @MaxLength(1000)
  readonly fifthAnswer: string;

  @IsString()
  @MaxLength(1000)
  readonly sixthAnswer: string;
}

export class CreateApplicationDto {
  @Type(() => PersonalInfo)
  @ValidateNested()
  personalInfo: PersonalInfo;

  @Type(() => ApplicationInfo)
  @ValidateNested()
  applicationInfo: ApplicationInfo;
}
