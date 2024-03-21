import { SearchProductByNameController } from '@controllers/Product/SearchProductByNameController';

function SearchProductByNameControllerFactory() {
  const searchProductByNameController = new SearchProductByNameController();

  return searchProductByNameController;
}

const searchProductByNameController = SearchProductByNameControllerFactory();

export { searchProductByNameController };
