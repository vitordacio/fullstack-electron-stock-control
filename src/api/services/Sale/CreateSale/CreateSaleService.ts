import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { ISaleRepository } from '@repositories/SaleRepository/ISaleRepository';
import { Sale } from '@entities/Sale/Sale';
import { AppError } from '@utils/AppError';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { mergeStockMovements } from '@utils/handleSale';
import { StockMovement } from '@entities/StockMovement/StockMovement';
import { IStockMovementRepository } from '@repositories/StockMovementRepository/IStockMovementRepository';
import { ICreateSaleDTO } from './ICreateSaleServiceDTO';

@injectable()
class CreateSaleService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('StockMovementRepository')
    private stockMovementRepository: IStockMovementRepository,
  ) {}

  async execute({
    cash,
    pix,
    debit,
    credit,
    discount,
    change,
    received,
    subtotal,
    total,
    stock_movements,
    reqUser,
  }: ICreateSaleDTO): Promise<Sale> {
    const mergedMovements = mergeStockMovements(stock_movements);

    const [author, products] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.productRepository.findManyByIds(
        mergedMovements.map(movement => movement.product_id),
      ),
    ]);

    if (!author) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (author.role_name === 'user' && !author.employee) {
      throw new AppError('Usuário não é vendedor', 404);
    }

    if (products.length !== mergedMovements.length) {
      throw new AppError('Produto não encontrado', 404);
    }

    const sale = this.saleRepository.create({
      id: v4(),
      company_id:
        author.role_name === 'user'
          ? author.employee.company_id
          : author.id_user,
      author_id: author.id_user,
      discount: discount || 0,
      change: change || 0,
      received: received || 0,
      subtotal: subtotal || 0,
      total: total || 0,
    });

    if (cash) sale.cash = cash;
    if (pix) sale.pix = pix;
    if (debit) sale.debit = debit;
    if (credit) sale.credit = credit;

    await this.saleRepository.save(sale);

    const movements: StockMovement[] = [];
    mergedMovements.forEach(movement => {
      const productIndex = products.findIndex(
        product => product.id_product === movement.product_id,
      );

      if (productIndex !== -1) {
        products[productIndex].stock_store_qtd =
          Number(products[productIndex].stock_store_qtd) -
          Number(movement.store_out);
      }

      const saleMovement = this.stockMovementRepository.create({
        id: v4(),
        product_id: movement.product_id,
        store_out: movement.store_out,
        price: movement.price,
        user_id: author.id_user,
        sale_id: sale.id_sale,
      });

      movements.push(saleMovement);
    });

    await Promise.all([
      this.stockMovementRepository.saveMany(movements),
      this.productRepository.saveMany(products),
    ]);

    return sale;
  }
}

export { CreateSaleService };
