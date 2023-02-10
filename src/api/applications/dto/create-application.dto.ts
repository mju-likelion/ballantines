import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Equals,
  IsEmail,
  IsIn,
  IsObject,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class PersonalInfo {
  @ApiProperty({
    example: '홍길동',
    description: '이름 (2글자 이상 10글자 이하)',
  })
  @IsString()
  @MinLength(2)
  /**
   * 대한민국 법적으로는 5글자가 최대이지만 예외케이스가 있어서 안전하게 10글자로 커트
   */
  @MaxLength(10)
  readonly name: string;

  @ApiProperty({
    example: '01012345678',
    description: '전화번호 (010으로 시작하는 11자리 숫자)',
  })
  @Matches(/^010\d{8}$/)
  readonly phone: string;

  @ApiProperty({
    example: 'test@email.com',
    description: '이메일',
  })
  @IsEmail()
  readonly email: string;

  /**
   * https://www.mju.ac.kr/mjukr/113/subview.do 에 있는 학과 이름을 기준으로 함
   */
  @ApiProperty({
    example: '컴퓨터공학과',
    description: '학과 (한글 2글자 이상 11글자 이하)',
  })
  @Matches(/^[가-힣]{2,11}$/)
  readonly major: string;

  @ApiProperty({
    example: '60123456',
    description: '학번 (60으로 시작하는 8자리 숫자)',
  })
  @Matches(/^60[0-9]{6}$/)
  readonly sid: string;

  @ApiProperty({
    example: '1',
    description: '학년 (1, 2, 3, 4)',
  })
  @IsIn(['1', '2', '3', '4'])
  readonly grade: '1' | '2' | '3' | '4';

  @ApiProperty({
    example: '재학',
    description: '재학 상태 (재학, 휴학, 졸업유예)',
  })
  @IsIn(['재학', '휴학', '졸업유예'])
  readonly enrollmentStatus: '재학' | '휴학' | '졸업유예';

  @ApiProperty({
    example: 'web',
    description: '지원 파트 (web, server, design)',
  })
  @IsIn(['web', 'server', 'design'])
  readonly part: 'web' | 'server' | 'design';

  @ApiProperty({
    example: true,
    description: '개인정보 수집 동의 (true여야만 함)',
  })
  @Equals(true)
  readonly personalInfoAgreement: true;
}

/**
 * 문항은 최대 6개일 것이라고 가정
 */
class ApplicationInfo {
  @ApiProperty({
    example: 'https://example.com/cv.zip',
    description: '자기소개서 링크 (URL)',
  })
  @IsUrl()
  @MaxLength(512)
  readonly cvUrl: string;

  @ApiProperty({
    example: '첫 번째 문항 답변입니다.',
    description: '첫 번째 문항 답변 (1000자 이하)',
  })
  @IsString()
  @MaxLength(1000)
  readonly firstAnswer: string;

  @ApiProperty({
    example: '두 번째 문항 답변입니다.',
    description: '두 번째 문항 답변 (1000자 이하)',
  })
  @IsString()
  @MaxLength(1000)
  readonly secondAnswer: string;

  @ApiProperty({
    example: '세 번째 문항 답변입니다.',
    description: '세 번째 문항 답변 (1000자 이하)',
  })
  @IsString()
  @MaxLength(1000)
  readonly thirdAnswer: string;

  @ApiProperty({
    example: '네 번째 문항 답변입니다.',
    description: '네 번째 문항 답변 (1000자 이하)',
  })
  @IsString()
  @MaxLength(1000)
  readonly fourthAnswer: string;

  @ApiProperty({
    example: '다섯 번째 문항 답변입니다.',
    description: '다섯 번째 문항 답변 (1000자 이하)',
  })
  @IsString()
  @MaxLength(1000)
  readonly fifthAnswer: string;

  @ApiProperty({
    example: '여섯 번째 문항 답변입니다.',
    description: '여섯 번째 문항 답변 (1000자 이하)',
  })
  @IsString()
  @MaxLength(1000)
  readonly sixthAnswer: string;
}

export class CreateApplicationDto {
  @Type(() => PersonalInfo)
  @IsObject()
  @ValidateNested()
  readonly personalInfo: PersonalInfo;

  @Type(() => ApplicationInfo)
  @IsObject()
  @ValidateNested()
  readonly applicationInfo: ApplicationInfo;
}
