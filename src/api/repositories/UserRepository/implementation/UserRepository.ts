// CREATE EXTENSION IF NOT EXISTS unaccent;
// CREATE EXTENSION IF NOT EXISTS pg_trgm;
import { Brackets, getRepository, Repository } from 'typeorm';
import { IUser } from '@entities/User/IUser';
import { User } from '@entities/User/User';
import { buildQuery, buildConditions } from '@utils/buildQuery';
import { extractTagsFromText } from '@utils/generateTags';
import { FindUserByCompany, IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  create(data: IUser): User {
    const user = this.ormRepository.create({
      id_user: data.id,
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      actived: data.actived,
      role_name: data.role_name,
      tags: data.tags as unknown as string,
    });

    return user;
  }

  async save(entitie: User): Promise<User> {
    const newUser = await this.ormRepository.save(entitie);

    return newUser;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      relations: ['employee'],
      where: { id_user: id },
      withDeleted: true,
    });

    return user;
  }

  async findLatestByName({
    company_id,
    name,
    page,
    limit,
  }: FindUserByCompany): Promise<User[]> {
    let tagName: string[] = [];
    if (name) tagName = extractTagsFromText(name);

    const sum = buildQuery(tagName);
    const conditions = buildConditions(tagName);

    const queryUsers = this.ormRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.employee', 'employee')
      .where('employee.company_id = :company_id', { company_id })
      .andWhere(
        new Brackets(qb => {
          qb.where(
            `${
              conditions
                ? `EXISTS (SELECT 1 FROM unnest(user.tags) tag WHERE ${conditions})`
                : '(:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(user.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query)))'
            }`,
            {
              query: `%${name}%`,
              nullName: name,
            },
          );

          return qb;
        }),
      );

    if (conditions) {
      queryUsers
        .addSelect(`(${sum} FROM unnest(user.tags) as tag)`, 'similarity')
        .addSelect(
          `(SELECT count(*) FROM unnest(user.tags) as tag WHERE ${conditions})`,
          'qtd',
        )
        .orderBy('user.created_at', 'DESC')
        .addOrderBy('similarity', 'DESC')
        .addOrderBy('qtd', 'DESC');
    } else {
      queryUsers
        .orderBy('user.created_at', 'DESC')
        .addOrderBy('user.name', 'DESC');
    }

    const users = await queryUsers
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    return users;
  }

  async findActivedByName({
    company_id,
    name,
    actived,
    page,
    limit,
  }: FindUserByCompany): Promise<User[]> {
    let tagName: string[] = [];
    if (name) tagName = extractTagsFromText(name);

    const sum = buildQuery(tagName);
    const conditions = buildConditions(tagName);

    const queryUsers = this.ormRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.employee', 'employee')
      .where('employee.company_id = :company_id', { company_id })
      .andWhere('user.actived = :actived', {
        actived,
      })
      .andWhere(
        new Brackets(qb => {
          qb.where(
            `${
              conditions
                ? `EXISTS (SELECT 1 FROM unnest(user.tags) tag WHERE ${conditions})`
                : '(:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(user.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query)))'
            }`,
            {
              query: `%${name}%`,
              nullName: name,
            },
          );

          return qb;
        }),
      );

    if (conditions) {
      queryUsers
        .addSelect(`(${sum} FROM unnest(user.tags) as tag)`, 'similarity')
        .addSelect(
          `(SELECT count(*) FROM unnest(user.tags) as tag WHERE ${conditions})`,
          'qtd',
        )
        .orderBy('similarity', 'DESC')
        .addOrderBy('qtd', 'DESC');
    } else {
      queryUsers.orderBy('user.name', 'DESC');
    }

    const users = await queryUsers
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    return users;
  }

  async findDeletedByName({
    company_id,
    name,
    page,
    limit,
  }: FindUserByCompany): Promise<User[]> {
    let tagName: string[] = [];
    if (name) tagName = extractTagsFromText(name);

    const sum = buildQuery(tagName);
    const conditions = buildConditions(tagName);

    const queryUsers = this.ormRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.employee', 'employee')
      .where('employee.company_id = :company_id', { company_id });

    queryUsers.andWhere(
      new Brackets(qb => {
        qb.where('user.deleted_at IS NOT NULL');

        if (name) {
          qb.andWhere(
            conditions
              ? `EXISTS (SELECT 1 FROM unnest(user.tags) tag WHERE ${conditions})`
              : '(:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(user.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query)))',
            {
              query: `%${name}%`,
              nullName: name,
            },
          );
        }

        return qb;
      }),
    );

    if (conditions) {
      queryUsers
        .addSelect(`(${sum} FROM unnest(user.tags) as tag)`, 'similarity')
        .addSelect(
          `(SELECT count(*) FROM unnest(user.tags) as tag WHERE ${conditions})`,
          'qtd',
        )
        .orderBy('similarity', 'DESC')
        .addOrderBy('qtd', 'DESC');
    } else {
      queryUsers.orderBy('user.name', 'DESC');
    }

    const users = await queryUsers
      .take(limit)
      .skip((page - 1) * limit)
      .withDeleted()
      .getMany();

    return users;
  }

  async findByRole(role: string): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: { role_name: role },
    });

    return users;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository
      .createQueryBuilder('user')
      .where('LOWER(user.username) = :query', {
        query: username.toLowerCase(),
      })
      .withDeleted()
      .getOne();

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository
      .createQueryBuilder('user')
      .where('LOWER(user.email) = :query', {
        query: email.toLowerCase(),
      })
      .withDeleted()
      .getOne();

    return user;
  }

  async findMaster(): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { role_name: 'master' },
    });

    return user;
  }

  async countCompanys(): Promise<number> {
    const count = await this.ormRepository.count({
      where: { role_name: 'company' },
    });

    return count;
  }

  async remove(entitie: User): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { UserRepository };
