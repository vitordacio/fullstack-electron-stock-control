import { IEmployeeRepository } from '@repositories/EmployeeRepository/IEmployeeRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindUserCountService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute(reqUser: AuthorizedUser<CompanyPerm>): Promise<number> {
    const result = await this.employeeRepository.countTotal(reqUser.id);

    return result;
  }
}

export { FindUserCountService };
