import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { IUpdatePasswordDTO } from './IUpdateUserDTO';

@injectable()
class UpdatePasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    user_id,
    password,
    new_password,
    reqUser,
  }: IUpdatePasswordDTO): Promise<User> {
    if (reqUser.role !== 'company' && !password) {
      throw new AppError('Informe a senha atual.', 400);
    }

    if (reqUser.role === 'user' && reqUser.id !== user_id) {
      throw new AppError('Operação não permitida.', 403);
    }

    const [user, requester] = await Promise.all([
      this.userRepository.findById(user_id),
      this.userRepository.findById(reqUser.id),
    ]);

    if (!requester) {
      throw new AppError(
        'Token expirado. Por favor, realize o login novamente.',
        400,
      );
    }

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (
      user.role_name === 'user' &&
      requester.role_name === 'company' &&
      user.employee &&
      requester.id_user !== user.employee.company_id
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    if (password) {
      const verify = await this.hashProvider.validateHash(
        password,
        user.password,
      );

      if (!verify) {
        throw new AppError('Senha inválida.', 404);
      }
    }

    const hashedPassword = await this.hashProvider.generateHash(new_password);

    user.password = hashedPassword;

    await this.userRepository.save(user);

    return user;
  }
}

export { UpdatePasswordService };
