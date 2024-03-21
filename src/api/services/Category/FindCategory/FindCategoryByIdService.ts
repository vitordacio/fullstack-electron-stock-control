import { inject, injectable } from 'tsyringe';
import { Category } from '@entities/Category/Category';
import { ICategoryRepository } from '@repositories/CategoryRepository/ICategoryRepository';
import { AppError } from '@utils/AppError';
import { IFindCategoryByIdDTO } from './IFindCategoryServiceDTO';

@injectable()
class FindCategoryByIdService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({
    category_id,
    reqUser,
  }: IFindCategoryByIdDTO): Promise<Category> {
    const category = await this.categoryRepository.findById(category_id);

    if (!category) {
      throw new AppError('Categoria não encontrada.', 404);
    }

    if (category.company_id !== reqUser.id) {
      throw new AppError('Categoria não pertence a essa empresa.', 400);
    }

    return category;
  }
}

export { FindCategoryByIdService };
