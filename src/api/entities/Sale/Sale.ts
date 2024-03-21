import { StockMovement } from '@entities/StockMovement/StockMovement';
import { User } from '@entities/User/User';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sales')
class Sale {
  @PrimaryColumn('uuid')
  id_sale: string;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  cash: number;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  pix: number;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  debit: number;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  credit: number;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  discount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  change: number;

  @Column('decimal', { precision: 10, scale: 2 })
  received: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column()
  company_id: string;

  @ManyToOne(() => User, user => user.sales)
  @JoinColumn({ name: 'company_id' })
  company: User;

  @Column()
  author_id: string;

  @ManyToOne(() => User, user => user.sales_author)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => StockMovement, stock_movement => stock_movement.sale)
  stock_movements: StockMovement[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Sale };
