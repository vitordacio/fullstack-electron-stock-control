import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '@repositories/CategoryRepository/ICategoryRepository';

@injectable()
class FindCategoryCountService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(reqUser: AuthorizedUser<CompanyPerm>): Promise<number> {
    const result = await this.categoryRepository.countTotal(reqUser.id);

    return result;
  }
}

export { FindCategoryCountService };
