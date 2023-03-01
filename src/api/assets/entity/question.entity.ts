import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  maxLength: number;

  @Column({ select: false })
  order: number;

  @Column({ select: false })
  part: string;
}
