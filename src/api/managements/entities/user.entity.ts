import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

type ManagerForm = {
  name: string;
  email: string;
  userInform: 'manager' | 'member';
  randomCode: string;
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

  @Column({ type: 'enum', enum: ['manager', 'member'] })
  userinform: 'manager' | 'member';

  @Column()
  verifytoken: string;

  static from({ name, email, userInform, randomCode }: ManagerForm): Manager {
    const manager = new Manager();
    manager.email = email;
    manager.name = name;
    manager.userinform = userInform;
    manager.verifytoken = randomCode;
    return manager;
  }
}
