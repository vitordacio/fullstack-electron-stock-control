import { Category } from '@entities/Category/Category';
import { Product } from '@entities/Product/Product';
import { Employee } from '@entities/Employee/Employee';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StockMovement } from '@entities/StockMovement/StockMovement';
import { Sale } from '@entities/Sale/Sale';

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id_user: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: 'user' })
  role_name: string;

  @Column({ default: true })
  actived: boolean;

  @Column({ array: true })
  @Exclude()
  tags: string;

  @OneToMany(() => Category, category => category.company)
  categories: Category[];

  @OneToMany(() => Product, product => product.company)
  products: Product[];

  @OneToMany(() => Sale, sale => sale.company)
  sales: Sale[];

  @OneToMany(() => Sale, sale => sale.author)
  sales_author: Sale[];

  @OneToMany(() => Employee, employee => employee.company)
  employees: Employee[];

  @OneToOne(() => Employee, employee => employee.user)
  employee: Employee;

  @OneToMany(() => StockMovement, stock_movement => stock_movement.user)
  stock_movements: StockMovement[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  sales_count: number;

  sales_total: number;
}

export { User };
