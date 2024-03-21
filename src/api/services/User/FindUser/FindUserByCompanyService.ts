import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IFindUserByCompanyDTO } from './IFindUserServiceDTO';

@injectable()
class FindUserByCompanyService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    situation,
    name,
    page,
    limit,
    reqUser,
  }: IFindUserByCompanyDTO): Promise<User[]> {
    const currentPage = page || 1;
    const currentLimit = limit || 20;
    let users: User[] = [];

    if (situation === 'latest') {
      users = await this.userRepository.findLatestByName({
        company_id: reqUser.id,
        name,
        page: currentPage,
        limit: currentLimit,
      });
    }

    if (situation === 'actived_true') {
      users = await this.userRepository.findActivedByName({
        company_id: reqUser.id,
        name,
        actived: true,
        page: currentPage,
        limit: currentLimit,
      });
    }

    if (situation === 'actived_false') {
      users = await this.userRepository.findActivedByName({
        company_id: reqUser.id,
        name,
        actived: false,
        page: currentPage,
        limit: currentLimit,
      });
    }

    if (situation === 'deleted') {
      users = await this.userRepository.findDeletedByName({
        company_id: reqUser.id,
        name,
        page: currentPage,
        limit: currentLimit,
      });
    }

    return users;
  }
}

export { FindUserByCompanyService };
