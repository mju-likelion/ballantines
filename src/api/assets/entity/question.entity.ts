import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Question')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  maxLength: number;

  @Column({ select: false })
  part: string;
}
