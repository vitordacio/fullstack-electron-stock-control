import { inject, injectable } from 'tsyringe';
import { Category } from '@entities/Category/Category';
import { ICategoryRepository } from '@repositories/CategoryRepository/ICategoryRepository';
import { IFindCategoryByCompanyDTO } from './IFindCategoryServiceDTO';

@injectable()
class FindCategoryByCompanyService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({
    name,
    page,
    limit,
    reqUser,
  }: IFindCategoryByCompanyDTO): Promise<Category[]> {
    const currentPage = page || 1;
    const currentLimit = limit || 20;

    const categories = await this.categoryRepository.findByCompany({
      company_id: reqUser.id,
      name,
      page: currentPage,
      limit: currentLimit,
    });

    return categories;
  }
}

export { FindCategoryByCompanyService };
