import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { ICategoryRepository } from '@repositories/CategoryRepository/ICategoryRepository';
import { Category } from '@entities/Category/Category';
import { extractTagsFromText } from '@utils/generateTags';
import { IUpdateCategoryDTO } from './IUpdateCategoryServiceDTO';

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({
    category_id,
    name,
    reqUser,
  }: IUpdateCategoryDTO): Promise<Category> {
    const category = await this.categoryRepository.findById(category_id);

    if (!category) {
      throw new AppError('Categoria não encontrada.', 404);
    }

    if (category.company_id !== reqUser.id) {
      throw new AppError('Categoria não pertence a essa empresa.', 400);
    }

    category.name = name;

    const tags = extractTagsFromText(`${name}`);
    category.tags = tags as unknown as string;

    await this.categoryRepository.save(category);

    return category;
  }
}

export { UpdateCategoryService };
