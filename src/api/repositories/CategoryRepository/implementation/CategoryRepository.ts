import { Brackets, getRepository, Repository } from 'typeorm';
import { ICategory } from '@entities/Category/ICategory';
import { Category } from '@entities/Category/Category';
import { buildQuery, buildConditions } from '@utils/buildQuery';
import { extractTagsFromText } from '@utils/generateTags';
import {
  FindCategoryByCompany,
  ICategoryRepository,
} from '../ICategoryRepository';

class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  create(data: ICategory): Category {
    const category = this.ormRepository.create({
      id_category: data.id,
      company_id: data.company_id,
      name: data.name,
      tags: data.tags as unknown as string,
    });

    return category;
  }

  async save(entitie: Category): Promise<Category> {
    const newCategory = await this.ormRepository.save(entitie);

    return newCategory;
  }

  async saveMany(entities: Category[]): Promise<Category[]> {
    const newCategorys = await this.ormRepository.save(entities);

    return newCategorys;
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      relations: ['company', 'products'],
      where: { id_category: id },
      withDeleted: true,
    });

    return category;
  }

  async findByCompany({
    company_id,
    name,
    page,
    limit,
  }: FindCategoryByCompany): Promise<Category[]> {
    let tagName: string[] = [];
    if (name) tagName = extractTagsFromText(name);

    const sum = buildQuery(tagName);
    const conditions = buildConditions(tagName);

    const queryCategories = this.ormRepository
      .createQueryBuilder('category')
      .where('category.company_id = :company_id', { company_id })
      .andWhere(
        new Brackets(qb => {
          qb.where(
            `${
              conditions
                ? `EXISTS (SELECT 1 FROM unnest(category.tags) tag WHERE ${conditions})`
                : '(:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(category.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query)))'
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
      queryCategories
        .addSelect(`(${sum} FROM unnest(category.tags) as tag)`, 'similarity')
        .addSelect(
          `(SELECT count(*) FROM unnest(category.tags) as tag WHERE ${conditions})`,
          'qtd',
        )
        .orderBy('created_at', 'DESC')
        .addOrderBy('similarity', 'DESC')
        .addOrderBy('qtd', 'DESC');
    } else {
      queryCategories
        .orderBy('created_at', 'DESC')
        .addOrderBy('category.name', 'DESC');
    }

    const categories = await queryCategories
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    return categories;
  }

  async findIndexByCompany(company_id: string): Promise<Category[]> {
    const categories = await this.ormRepository.find({
      where: { company_id },
      order: { name: 'ASC' },
    });

    return categories;
  }

  async countTotal(company_id: string): Promise<number> {
    const count = await this.ormRepository.count({
      where: { company_id },
    });

    return count;
  }

  async remove(entitie: Category): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { CategoryRepository };
