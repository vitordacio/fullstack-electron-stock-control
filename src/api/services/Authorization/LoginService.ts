import { inject, injectable } from 'tsyringe';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { generateAccessToken } from '@providers/Token/AccessTokenProvider';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { User } from '@entities/User/User';
import { v4 } from 'uuid';
import { extractTagsFromText } from '@utils/generateTags';
import { isEmail } from '@utils/handleUser';
import { ILoginDTO, ILoginResponse } from './LoginDTO';

@injectable()
class LoginService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ login, password }: ILoginDTO): Promise<ILoginResponse> {
    let user: User | undefined;

    if (login === 'master') {
      user = await this.userRepository.findMaster();

      if (!user) {
        const hashedPassword = await this.hashProvider.generateHash(password);

        user = this.userRepository.create({
          id: v4(),
          name: 'Master',
          email: 'master',
          username: 'master',
          role_name: 'master',
          password: hashedPassword,
          actived: true,
          tags: extractTagsFromText('master'),
        });

        await this.userRepository.save(user);
      }
    } else if (login === 'default') {
      const count = await this.userRepository.countCompanys();

      if (count > 0) {
        user = await this.userRepository.findByUsername(login);
      } else {
        const hashedPassword = await this.hashProvider.generateHash(password);

        user = this.userRepository.create({
          id: v4(),
          name: 'Default',
          email: 'default@email.com',
          username: 'default',
          actived: true,
          role_name: 'company',
          password: hashedPassword,
          tags: extractTagsFromText('default'),
        });

        await this.userRepository.save(user);
      }
    } else {
      const handleIsEmail = isEmail(login);

      user = handleIsEmail
        ? await this.userRepository.findByEmail(login)
        : await this.userRepository.findByUsername(login);
    }

    if (!user) {
      throw new AppError('Combinação de usuário/senha incorreta!', 401);
    }

    const passwordMatched = await this.hashProvider.validateHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Combinação de usuário/senha incorreta!', 401);
    }

    const accessToken = generateAccessToken(
      user.id_user,
      user.role_name as RoleOptions,
    );

    return {
      user,
      accessToken,
    };
  }
}

export { LoginService };
