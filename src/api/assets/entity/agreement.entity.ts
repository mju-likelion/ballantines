import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Agreement')
export class Agreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;

  @Column({ length: 6000 })
  agreementContent: string;
}
