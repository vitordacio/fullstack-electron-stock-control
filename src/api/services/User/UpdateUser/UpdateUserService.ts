import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { extractTagsFromText } from '@utils/generateTags';
import { isUsername } from '@utils/handleUser';
import { IUpdateUserDTO } from './IUpdateUserDTO';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    name,
    email,
    username,
    user_id,
    actived,
    reqUser,
  }: IUpdateUserDTO): Promise<User> {
    if (!isUsername(username)) {
      throw new AppError('Nome de usuário inválido.', 400);
    }

    if (reqUser.role === 'user' && reqUser.id !== user_id) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (
      user.id_user !== reqUser.id &&
      reqUser.id !== user.employee.company_id
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    if (user.name !== name) user.name = name;

    if (user.email !== email) {
      const emailExists = await this.userRepository.findByEmail(email);

      if (emailExists) {
        throw new AppError('E-mail já cadastrado.', 400);
      }

      user.email = email;
    }

    if (user.username !== username) {
      const usernameExists = await this.userRepository.findByUsername(username);

      if (usernameExists) {
        throw new AppError('Nome de usuário já cadastrado.', 400);
      }

      user.username = username;
    }

    if (user.actived !== actived) user.actived = actived;

    user.tags = extractTagsFromText(
      `${user.name} ${user.username}`,
    ) as unknown as string;

    await this.userRepository.save(user);

    return user;
  }
}

export { UpdateUserService };
