import { getRepository, Repository } from 'typeorm';
import { IEmployee } from '@entities/Employee/IEmployee';
import { Employee } from '@entities/Employee/Employee';
import { IEmployeeRepository } from '../IEmployeeRepository';

class EmployeeRepository implements IEmployeeRepository {
  private ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  create(data: IEmployee): Employee {
    const category = this.ormRepository.create({
      id_employee: data.id,
      company_id: data.company_id,
      user_id: data.user_id,
    });

    return category;
  }

  async save(entitie: Employee): Promise<Employee> {
    const newEmployee = await this.ormRepository.save(entitie);

    return newEmployee;
  }

  async saveMany(entities: Employee[]): Promise<Employee[]> {
    const newEmployees = await this.ormRepository.save(entities);

    return newEmployees;
  }

  async findById(id: string): Promise<Employee | undefined> {
    const category = await this.ormRepository.findOne({
      relations: ['company', 'user'],
      where: { id_category: id },
    });

    return category;
  }

  async countTotal(company_id: string): Promise<number> {
    const count = await this.ormRepository.count({
      where: { company_id },
    });

    return count;
  }

  async remove(entitie: Employee): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { EmployeeRepository };
