import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { ISaleRepository } from '@repositories/SaleRepository/ISaleRepository';
import { IDeleteSaleDTO } from './IDeleteSaleServiceDTO';

@injectable()
class DeleteSaleService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
  ) {}

  async execute({ sale_id, reqUser }: IDeleteSaleDTO): Promise<void> {
    const sale = await this.saleRepository.findById(sale_id);

    if (!sale) {
      throw new AppError('Venda não encontrada.', 404);
    }

    if (sale.company_id !== reqUser.id) {
      throw new AppError('Venda não pertence a essa empresa.', 400);
    }

    await this.saleRepository.remove(sale);
  }
}

export { DeleteSaleService };
