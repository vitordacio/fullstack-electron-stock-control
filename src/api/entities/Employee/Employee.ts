import { User } from '@entities/User/User';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('employees')
class Employee {
  @PrimaryColumn('uuid')
  id_employee: string;

  @Column()
  company_id: string;

  @ManyToOne(() => User, user => user.employees)
  @JoinColumn({ name: 'company_id' })
  company: User;

  @Column()
  user_id: string;

  @OneToOne(() => User, user => user.employee)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Employee };
