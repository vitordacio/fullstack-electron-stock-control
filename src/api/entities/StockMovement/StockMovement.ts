import { Product } from '@entities/Product/Product';
import { Sale } from '@entities/Sale/Sale';
import { User } from '@entities/User/User';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stock_movements')
class StockMovement {
  @PrimaryColumn('uuid')
  id_stock_movement: string;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  local_in: number;

  @Column({ default: 0 })
  local_out: number;

  @Column({ default: 0 })
  store_in: number;

  @Column({ default: 0 })
  store_out: number;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, product => product.stock_movements)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.stock_movements)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  sale_id: string;

  @ManyToOne(() => Sale, sale => sale.stock_movements)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export { StockMovement };
