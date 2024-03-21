import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { ICategoryRepository } from '@repositories/CategoryRepository/ICategoryRepository';
import { Product } from '@entities/Product/Product';
import { AppError } from '@utils/AppError';
import { extractTagsFromText } from '@utils/generateTags';
import { Category } from '@entities/Category/Category';
import { ICreateProductDTO } from './ICreateProductServiceDTO';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({
    category_id,
    name,
    code,
    price,
    price_cost,
    stock_local_qtd,
    stock_local_min,
    stock_local_max,
    stock_store_qtd,
    stock_store_min,
    stock_store_max,
    actived,
    reqUser,
  }: ICreateProductDTO): Promise<Product> {
    let category: Category | undefined;
    if (category_id) {
      category = await this.categoryRepository.findById(category_id);

      if (!category) {
        throw new AppError('Categoria não encontrada.', 404);
      }

      if (category.company_id !== reqUser.id) {
        throw new AppError('Categoria não pertence a essa empresa.', 400);
      }
    }

    const tags = extractTagsFromText(`${name} ${code}`);

    const product = this.productRepository.create({
      id: v4(),
      company_id: reqUser.id,
      name,
      code,
      price,
      stock_local_qtd: stock_local_qtd || 0,
      stock_store_qtd: stock_store_qtd || 0,
      actived,
      tags,
    });

    if (category) product.category_id = category.id_category;
    if (price_cost) product.price_cost = price_cost;
    if (stock_local_min) product.stock_local_min = stock_local_min;
    if (stock_local_max) product.stock_local_max = stock_local_max;
    if (stock_store_min) product.stock_store_min = stock_store_min;
    if (stock_store_max) product.stock_store_max = stock_store_max;

    await this.productRepository.save(product);

    return product;
  }
}

export { CreateProductService };
