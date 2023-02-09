import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Agreement')
export class Agreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  updatedAt: string;

  @Column()
  agreementContent: string;
}
