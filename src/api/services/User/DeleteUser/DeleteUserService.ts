import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IDeleteUserDTO } from './IDeleteUserServiceDTO';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ user_id, reqUser }: IDeleteUserDTO): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user || reqUser.id !== user.employee.company_id) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    await this.userRepository.remove(user);
  }
}

export { DeleteUserService };
