import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { ICategoryRepository } from '@repositories/CategoryRepository/ICategoryRepository';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { IDeleteCategoryDTO } from './IDeleteCategoryServiceDTO';

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({ category_id, reqUser }: IDeleteCategoryDTO): Promise<void> {
    const category = await this.categoryRepository.findById(category_id);

    if (!category) {
      throw new AppError('Categoria não encontrada.', 404);
    }

    if (category.company_id !== reqUser.id) {
      throw new AppError('Categoria não pertence a essa empresa.', 400);
    }

    await this.categoryRepository.remove(category);

    if (category.products.length !== 0) {
      const updatedProducts = category.products.map(product => {
        product.category_id = null as unknown as string;
        return product;
      });

      await this.productRepository.saveMany(updatedProducts);
    }
  }
}

export { DeleteCategoryService };
