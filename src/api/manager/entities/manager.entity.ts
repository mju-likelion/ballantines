import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type ManagerForm = {
  name: string;
  email: string;
  verifyToken: string;
};

@Entity('Managers')
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  verifyToken: string;

  static from({ name, email, verifyToken }: ManagerForm): Manager {
    const manager = new Manager();
    manager.email = email;
    manager.name = name;
    manager.verifyToken = verifyToken;
    return manager;
  }
}
