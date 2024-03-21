import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { User } from '@entities/User/User';
import { AppError } from '@utils/AppError';
import { extractTagsFromText } from '@utils/generateTags';
import { isUsername } from '@utils/handleUser';
import { IEmployeeRepository } from '@repositories/EmployeeRepository/IEmployeeRepository';
import { ICreateUserDTO } from './ICreateUserServiceDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    username,
    email,
    role_name,
    actived,
    reqUser,
  }: ICreateUserDTO): Promise<User> {
    if (role_name === 'company' && reqUser.role !== 'master') {
      throw new AppError('Não autorizado.', 403);
    }

    if (!isUsername(username)) {
      throw new AppError('Nome de usuário inválido.', 400);
    }

    const [emailExists, usernameExists] = await Promise.all([
      this.userRepository.findByEmail(email),
      this.userRepository.findByUsername(username),
    ]);

    if (emailExists) {
      throw new AppError('E-mail já cadastrado.', 400);
    }

    if (usernameExists) {
      throw new AppError('Nome de usuário já cadastrado.', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash('123456');

    const user = this.userRepository.create({
      id: v4(),
      name,
      email,
      username,
      password: hashedPassword,
      role_name,
      actived,
      tags: extractTagsFromText(`${username} ${name}`),
    });

    await this.userRepository.save(user);

    if (role_name === 'user') {
      const employee = this.employeeRepository.create({
        id: v4(),
        company_id: reqUser.id,
        user_id: user.id_user,
      });

      await this.employeeRepository.save(employee);
    }

    return user;
  }
}

export { CreateUserService };
