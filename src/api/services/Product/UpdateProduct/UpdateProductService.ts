import { inject, injectable } from 'tsyringe';
import { Product } from '@entities/Product/Product';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { AppError } from '@utils/AppError';
import { extractTagsFromText } from '@utils/generateTags';
import { ICategoryRepository } from '@repositories/CategoryRepository/ICategoryRepository';
import { Category } from '@entities/Category/Category';
import { IUpdateProductDTO } from './IUpdateProductDTO';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({
    product_id,
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
  }: IUpdateProductDTO): Promise<Product> {
    let product: Product | undefined;
    let category: Category | undefined;

    if (category_id) {
      [product, category] = await Promise.all([
        this.productRepository.findById(product_id),
        this.categoryRepository.findById(category_id),
      ]);

      if (!category) {
        throw new AppError('Categoria não encontrada.', 404);
      }

      if (category.company_id !== reqUser.id) {
        throw new AppError('Categoria não pertence a essa empresa.', 400);
      }
    } else {
      product = await this.productRepository.findById(product_id);
    }

    if (!product) {
      throw new AppError('Produto não encontrado.', 404);
    }

    if (product.company_id !== reqUser.id) {
      throw new AppError('Produto não pertence a essa empresa.', 400);
    }

    product.name = name;
    product.code = code || '';
    product.price = price;
    product.price_cost = price_cost || (null as unknown as number);
    product.stock_local_qtd = stock_local_qtd || 0;
    product.stock_local_min = stock_local_min || (null as unknown as number);
    product.stock_local_max = stock_local_max || (null as unknown as number);
    product.stock_store_qtd = stock_store_qtd || 0;
    product.stock_store_min = stock_store_min || (null as unknown as number);
    product.stock_store_max = stock_store_max || (null as unknown as number);
    product.actived = actived;
    product.category = category || (null as unknown as Category);

    const tags = extractTagsFromText(`${name} ${code}`);
    product.tags = tags as unknown as string;

    await this.productRepository.save(product);

    return product;
  }
}

export { UpdateProductService };
