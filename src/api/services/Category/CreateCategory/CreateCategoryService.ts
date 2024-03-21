import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { ICategoryRepository } from '@repositories/CategoryRepository/ICategoryRepository';
import { Category } from '@entities/Category/Category';
import { extractTagsFromText } from '@utils/generateTags';
import { ICreateCategoryDTO } from './ICreateCategoryServiceDTO';

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({ name, reqUser }: ICreateCategoryDTO): Promise<Category> {
    const tags = extractTagsFromText(`${name}`);

    const category = this.categoryRepository.create({
      id: v4(),
      company_id: reqUser.id,
      name,
      tags,
    });

    await this.categoryRepository.save(category);

    return category;
  }
}

export { CreateCategoryService };
