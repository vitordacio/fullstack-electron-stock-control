import { IUser } from '@entities/User/IUser';
import { User } from '@entities/User/User';

export type FindUserByCompany = {
  company_id: string;
  name?: string;
  actived?: boolean;
  page: number;
  limit: number;
};

export interface IUserRepository {
  create(data: IUser): User;
  save(entitie: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findLatestByName(data: FindUserByCompany): Promise<User[]>;
  findActivedByName(data: FindUserByCompany): Promise<User[]>;
  findDeletedByName(data: FindUserByCompany): Promise<User[]>;
  findByRole(role: string): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  countCompanys(): Promise<number>;
  findMaster(): Promise<User | undefined>;
  remove(entitie: User): Promise<void>;
}
