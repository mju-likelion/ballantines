import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Agreements')
export class Agreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 6000 })
  agreementContent: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
