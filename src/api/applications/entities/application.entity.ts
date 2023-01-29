import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Application')
export class ApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  name: string;

  @Column({ type: 'char', length: 11, unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 11 })
  major: string;

  @Column({ type: 'char', length: 8, unique: true })
  sid: string;

  @Column({ type: 'enum', enum: ['1', '2', '3', '4'] })
  grade: '1' | '2' | '3' | '4';

  @Column({ type: 'enum', enum: ['재학', '휴학', '졸업유예'] })
  enrollmentStatus: '재학' | '휴학' | '졸업유예';

  @Column({ type: 'enum', enum: ['web', 'server', 'design'] })
  part: 'web' | 'server' | 'design';

  @Column({ type: 'datetime', default: () => 'NOW()' })
  personalInfoAgreementDate: Date;

  @Column({ length: 512 })
  cvUrl: string;

  @Column({ nullable: true })
  firstAnswer: string;

  @Column({ nullable: true })
  secondAnswer: string;

  @Column({ nullable: true })
  thirdAnswer: string;

  @Column({ nullable: true })
  fourthAnswer: string;

  @Column({ nullable: true })
  fifthAnswer: string;

  @Column({ nullable: true })
  sixthAnswer: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
