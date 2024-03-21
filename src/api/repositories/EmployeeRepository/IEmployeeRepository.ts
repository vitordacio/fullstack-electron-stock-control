import { IEmployee } from '@entities/Employee/IEmployee';
import { Employee } from '@entities/Employee/Employee';

export type FindEmployeeByCompany = {
  company_id: string;
  name?: string;
  actived?: boolean;
  page: number;
  limit: number;
};

export interface IEmployeeRepository {
  create(data: IEmployee): Employee;
  save(entitie: Employee): Promise<Employee>;
  saveMany(entities: Employee[]): Promise<Employee[]>;
  findById(id: string): Promise<Employee | undefined>;
  countTotal(company_id: string): Promise<number>;
  remove(entitie: Employee): Promise<void>;
}
