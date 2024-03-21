// CREATE EXTENSION IF NOT EXISTS unaccent;
// CREATE EXTENSION IF NOT EXISTS pg_trgm;
// productname: data.productname.replace(/\D/g, ''),
import { getRepository, In, Repository, Brackets } from 'typeorm';
import { IProduct } from '@entities/Product/IProduct';
import { Product } from '@entities/Product/Product';
import { extractTagsFromText } from '@utils/generateTags';
import { buildConditions, buildQuery } from '@utils/buildQuery';
import {
  FindProductByCompany,
  IProductRepository,
} from '../IProductRepository';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  create(data: IProduct): Product {
    const product = this.ormRepository.create({
      id_product: data.id,
      company_id: data.company_id,
      category_id: data.category_id,
      name: data.name,
      code: data.code,
      price: data.price,
      price_cost: data.price_cost,
      stock_local_qtd: data.stock_local_qtd,
      stock_local_min: data.stock_local_min,
      stock_local_max: data.stock_local_max,
      stock_store_qtd: data.stock_store_qtd,
      stock_store_min: data.stock_store_min,
      stock_store_max: data.stock_store_max,
      actived: data.actived,
      tags: data.tags as unknown as string,
    });

    return product;
  }

  async save(entitie: Product): Promise<Product> {
    const newProduct = await this.ormRepository.save(entitie);

    return newProduct;
  }

  async saveMany(entities: Product[]): Promise<Product[]> {
    const newProducts = await this.ormRepository.save(entities);

    return newProducts;
  }

  async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      relations: ['company', 'category', 'stock_movements'],
      where: { id_product: id },
      withDeleted: true,
    });

    return product;
  }

  async findManyByIds(ids: string[]): Promise<Product[]> {
    const product = await this.ormRepository.find({
      relations: ['category'],
      where: { id_product: In(ids) },
      withDeleted: true,
    });

    return product;
  }

  async countTotal(company_id: string): Promise<number> {
    const count = await this.ormRepository.count({
      where: { company_id },
    });

    return count;
  }

  async countAlertLocal(company_id: string): Promise<number> {
    const count = await this.ormRepository.count({
      where: { company_id },
    });

    return count;
  }

  async countByCompany(company_id: string): Promise<{
    countTotal: number;
    countAlertLocal: number;
    countAlertStore: number;
  }> {
    const queryBuilder = this.ormRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.company_id = :company_id', { company_id });

    const countTotal = await queryBuilder.getCount();

    const countAlertLocal = await queryBuilder
      .andWhere(
        'product.stock_local_qtd <= product.stock_local_min OR product.stock_local_qtd >= product.stock_local_max',
      )
      .getCount();

    const countAlertStore = await queryBuilder
      .andWhere(
        'product.stock_store_qtd <= product.stock_store_min OR product.stock_store_qtd >= product.stock_store_max',
      )
      .getCount();

    return { countTotal, countAlertLocal, countAlertStore };
  }

  async findProductsAndCountByStockAlert(company_id: string): Promise<{
    products: Product[];
    count: number;
  }> {
    const [products, count] = await this.ormRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.company_id = :company_id', { company_id })
      .andWhere(
        'product.stock_local_qtd <= product.stock_local_min OR product.stock_local_qtd >= product.stock_local_max',
      )
      .orWhere(
        'product.stock_store_qtd <= product.stock_store_min OR product.stock_store_qtd >= product.stock_store_max',
      )
      .getManyAndCount();

    return { products, count };
  }

  async findProductsAndCountByStockLocalAlert(company_id: string): Promise<{
    products: Product[];
    count: number;
  }> {
    const [products, count] = await this.ormRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.company_id = :company_id', { company_id })
      .andWhere(
        'product.stock_local_qtd <= product.stock_local_min OR product.stock_local_qtd >= product.stock_local_max',
      )
      .getManyAndCount();

    return { products, count };
  }

  async findProductsAndCountByStockStoreAlert(company_id: string): Promise<{
    products: Product[];
    count: number;
  }> {
    const [products, count] = await this.ormRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.company_id = :company_id', { company_id })
      .andWhere(
        'product.stock_store_qtd <= product.stock_store_min OR product.stock_store_qtd >= product.stock_store_max',
      )
      .getManyAndCount();

    return { products, count };
  }

  async searchByName({
    company_id,
    name,
    page,
    limit,
  }: FindProductByCompany): Promise<Product[]> {
    let tagName: string[] = [];
    if (name) tagName = extractTagsFromText(name);

    const sum = buildQuery(tagName);
    const conditions = buildConditions(tagName);

    const queryProducts = this.ormRepository
      .createQueryBuilder('product')
      .where('product.company_id = :company_id', { company_id })
      .andWhere(
        new Brackets(qb => {
          qb.where(
            `${
              conditions
                ? `EXISTS (SELECT 1 FROM unnest(product.tags) tag WHERE ${conditions})`
                : '(:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(product.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query)))'
            }`,
            {
              query: `%${name}%`,
              nullName: name,
            },
          );

          return qb;
        }),
      );

    if (conditions) {
      queryProducts
        .addSelect(`(${sum} FROM unnest(product.tags) as tag)`, 'similarity')
        .addSelect(
          `(SELECT count(*) FROM unnest(product.tags) as tag WHERE ${conditions})`,
          'qtd',
        )
        .orderBy('created_at', 'DESC')
        .addOrderBy('similarity', 'DESC')
        .addOrderBy('qtd', 'DESC');
    } else {
      queryProducts
        .orderBy('created_at', 'DESC')
        .addOrderBy('product.name', 'DESC');
    }

    const products = await queryProducts
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    return products;
  }

  async findLatestByName({
    company_id,
    category_id,
    name,
    page,
    limit,
  }: FindProductByCompany): Promise<Product[]> {
    let tagName: string[] = [];
    if (name) tagName = extractTagsFromText(name);

    const sum = buildQuery(tagName);
    const conditions = buildConditions(tagName);

    const queryProducts = this.ormRepository
      .createQueryBuilder('product')
      .where('product.company_id = :company_id', { company_id })
      .andWhere(
        new Brackets(qb => {
          qb.where(
            `${
              conditions
                ? `EXISTS (SELECT 1 FROM unnest(product.tags) tag WHERE ${conditions})`
                : '(:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(product.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query)))'
            }`,
            {
              query: `%${name}%`,
              nullName: name,
            },
          );

          return qb;
        }),
      );

    if (category_id) {
      if (category_id === 'none') {
        queryProducts.andWhere('product.category_id IS NULL');
      } else {
        queryProducts.andWhere('product.category_id = :category_id', {
          category_id,
        });
      }
    }

    if (conditions) {
      queryProducts
        .addSelect(`(${sum} FROM unnest(product.tags) as tag)`, 'similarity')
        .addSelect(
          `(SELECT count(*) FROM unnest(product.tags) as tag WHERE ${conditions})`,
          'qtd',
        )
        .orderBy('created_at', 'DESC')
        .addOrderBy('similarity', 'DESC')
        .addOrderBy('qtd', 'DESC');
    } else {
      queryProducts
        .orderBy('created_at', 'DESC')
        .addOrderBy('product.name', 'DESC');
    }

    const products = await queryProducts
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    return products;
  }

  async findActivedByName({
    company_id,
    category_id,
    name,
    actived,
    page,
    limit,
  }: FindProductByCompany): Promise<Product[]> {
    let tagName: string[] = [];
    if (name) tagName = extractTagsFromText(name);

    const sum = buildQuery(tagName);
    const conditions = buildConditions(tagName);

    const queryProducts = this.ormRepository
      .createQueryBuilder('product')
      .where('product.company_id = :company_id', { company_id })
      .andWhere('product.actived = :actived', {
        actived,
      })
      .andWhere(
        new Brackets(qb => {
          qb.where(
            `${
              conditions
                ? `EXISTS (SELECT 1 FROM unnest(product.tags) tag WHERE ${conditions})`
                : '(:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(product.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query)))'
            }`,
            {
              query: `%${name}%`,
              nullName: name,
            },
          );

          return qb;
        }),
      );

    if (category_id) {
      if (category_id === 'none') {
        queryProducts.andWhere('product.category_id IS NULL');
      } else {
        queryProducts.andWhere('product.category_id = :category_id', {
          category_id,
        });
      }
    }

    if (conditions) {
      queryProducts
        .addSelect(`(${sum} FROM unnest(product.tags) as tag)`, 'similarity')
        .addSelect(
          `(SELECT count(*) FROM unnest(product.tags) as tag WHERE ${conditions})`,
          'qtd',
        )
        .orderBy('similarity', 'DESC')
        .addOrderBy('qtd', 'DESC');
    } else {
      queryProducts.orderBy('product.name', 'DESC');
    }

    const products = await queryProducts
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    return products;
  }

  async findDeletedByName({
    company_id,
    category_id,
    name,
    page,
    limit,
  }: FindProductByCompany): Promise<Product[]> {
    let tagName: string[] = [];
    if (name) tagName = extractTagsFromText(name);

    const sum = buildQuery(tagName);
    const conditions = buildConditions(tagName);

    const queryProducts = this.ormRepository
      .createQueryBuilder('product')
      .where('product.company_id = :company_id', { company_id });

    if (category_id) {
      if (category_id === 'none') {
        queryProducts.andWhere('product.category_id IS NULL');
      } else {
        queryProducts.andWhere('product.category_id = :category_id', {
          category_id,
        });
      }
    }

    queryProducts.andWhere(
      new Brackets(qb => {
        qb.where('product.deleted_at IS NOT NULL');

        if (name) {
          qb.andWhere(
            conditions
              ? `EXISTS (SELECT 1 FROM unnest(product.tags) tag WHERE ${conditions})`
              : '(:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(product.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query)))',
            {
              query: `%${name}%`,
              nullName: name,
            },
          );
        }

        return qb;
      }),
    );

    if (conditions) {
      queryProducts
        .addSelect(`(${sum} FROM unnest(product.tags) as tag)`, 'similarity')
        .addSelect(
          `(SELECT count(*) FROM unnest(product.tags) as tag WHERE ${conditions})`,
          'qtd',
        )
        .orderBy('similarity', 'DESC')
        .addOrderBy('qtd', 'DESC');
    } else {
      queryProducts.orderBy('product.name', 'DESC');
    }

    const products = await queryProducts
      .take(limit)
      .skip((page - 1) * limit)
      .withDeleted()
      .getMany();

    return products;
  }

  async remove(entitie: Product): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { ProductRepository };
