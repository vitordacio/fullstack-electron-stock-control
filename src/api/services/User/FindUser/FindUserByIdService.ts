import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { ISaleRepository } from '@repositories/SaleRepository/ISaleRepository';
import { IFindUserByIdDTO } from './IFindUserServiceDTO';

@injectable()
class FindUserByIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
  ) {}

  async execute({ user_id, reqUser }: IFindUserByIdDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user || reqUser.id !== user.employee.company_id) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const saleResult = await this.saleRepository.findSalesByAuthorId(
      user.id_user,
    );

    user.sales_count = saleResult.sales_count;
    user.sales_total = saleResult.sales_total;

    return user;
  }
}

export { FindUserByIdService };
