import { Category } from '@entities/Category/Category';
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

@Entity('products')
class Product {
  @PrimaryColumn('uuid')
  id_product: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  code: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  price_cost: number;

  @Column({ default: 0 })
  stock_local_qtd: number;

  @Column({ nullable: true })
  stock_local_min: number;

  @Column({ nullable: true })
  stock_local_max: number;

  @Column({ default: 0 })
  stock_store_qtd: number;

  @Column({ nullable: true })
  stock_store_min: number;

  @Column({ nullable: true })
  stock_store_max: number;

  @Column({ default: true })
  actived: boolean;

  @Column({ array: true })
  @Exclude()
  tags: string;

  @Column({ nullable: true })
  category_id: string;

  @ManyToOne(() => Category, category => category.products, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  company_id: string;

  @ManyToOne(() => User, user => user.products, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: User;

  @OneToMany(() => StockMovement, stock_movement => stock_movement.product)
  stock_movements: StockMovement[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export { Product };
