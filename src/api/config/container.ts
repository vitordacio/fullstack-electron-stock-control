import { container } from 'tsyringe';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { UserRepository } from '@repositories/UserRepository/implementation/UserRepository';
import { IEmployeeRepository } from '@repositories/EmployeeRepository/IEmployeeRepository';
import { EmployeeRepository } from '@repositories/EmployeeRepository/implementation/EmployeeRepository';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { HashProvider } from '@providers/HashProvider/implementation/HashProvider';
import { CategoryRepository } from '@repositories/CategoryRepository/implementation/CategoryRepository';
import { ICategoryRepository } from '@repositories/CategoryRepository/ICategoryRepository';
import { ProductRepository } from '@repositories/ProductRepository/implementation/ProductRepository';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { StockMovementRepository } from '@repositories/StockMovementRepository/implementation/StockMovementRepository';
import { IStockMovementRepository } from '@repositories/StockMovementRepository/IStockMovementRepository';
import { SaleRepository } from '@repositories/SaleRepository/implementation/SaleRepository';
import { ISaleRepository } from '@repositories/SaleRepository/ISaleRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IEmployeeRepository>(
  'EmployeeRepository',
  EmployeeRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IStockMovementRepository>(
  'StockMovementRepository',
  StockMovementRepository,
);

container.registerSingleton<ISaleRepository>('SaleRepository', SaleRepository);
