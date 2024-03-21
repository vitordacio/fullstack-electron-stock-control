import { inject, injectable } from 'tsyringe';
import { Sale } from '@entities/Sale/Sale';
import { ISaleRepository } from '@repositories/SaleRepository/ISaleRepository';
import { AppError } from '@utils/AppError';
import { IFindSaleByIdDTO } from './IFindSaleServiceDTO';

@injectable()
class FindSaleByIdService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
  ) {}

  async execute({ sale_id, reqUser }: IFindSaleByIdDTO): Promise<Sale> {
    const sale = await this.saleRepository.findById(sale_id);

    if (!sale) {
      throw new AppError('Venda não encontrada.', 404);
    }

    if (sale.company_id !== reqUser.id) {
      throw new AppError('Venda não pertence a essa empresa.', 400);
    }

    return sale;
  }
}

export { FindSaleByIdService };
