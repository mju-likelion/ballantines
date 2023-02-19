import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

type ManagerForm = {
  name: string;
  email: string;
  managerInform: 'manager' | 'rep';
  verifyToken: string;
};

@Entity('Managers')
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  name: string;

  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['manager', 'rep'] })
  managerInform: 'manager' | 'rep';

  @Column()
  verifyToken: string;

  static from({
    name,
    email,
    managerInform,
    verifyToken,
  }: ManagerForm): Manager {
    const manager = new Manager();
    manager.email = email;
    manager.name = name;
    manager.managerInform = managerInform;
    manager.verifyToken = verifyToken;
    return manager;
  }
}
