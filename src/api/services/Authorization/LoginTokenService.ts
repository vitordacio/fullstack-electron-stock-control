import { inject, injectable } from 'tsyringe';
import { generateAccessToken } from '@providers/Token/AccessTokenProvider';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { ILoginResponse } from './LoginDTO';

@injectable()
class LoginTokenService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(
    user: AuthorizedUser<CompanyPerm | AdmPerm | UserPerm>,
  ): Promise<ILoginResponse> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Token expirado, realize o login novamente!', 401);
    }

    const accessToken = generateAccessToken(
      foundUser.id_user,
      foundUser.role_name as RoleOptions,
    );

    return {
      user: foundUser,
      accessToken,
    };
  }
}

export { LoginTokenService };
