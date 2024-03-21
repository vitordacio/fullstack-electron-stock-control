import { inject, injectable } from 'tsyringe';
import { Category } from '@entities/Category/Category';
import { ICategoryRepository } from '@repositories/CategoryRepository/ICategoryRepository';

@injectable()
class FindCategoryIndexService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(reqUser: AuthorizedUser<CompanyPerm>): Promise<Category[]> {
    const categories = await this.categoryRepository.findIndexByCompany(
      reqUser.id,
    );

    return categories;
  }
}

export { FindCategoryIndexService };
