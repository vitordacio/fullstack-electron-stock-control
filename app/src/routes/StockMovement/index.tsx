import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import assets from '../../assets';
import { useEffect, useState } from 'react';
import TableStockMovement from '../../components/Table/StockMovement';
import { useMessage } from '../../contexts/message';
import { stockMovementService } from '../../services/StockMovement';
import { formatDate } from '../../utils/formatDate';
import { IStockMovement } from '../../interfaces/stockMovement';
import { IProduct } from '../../interfaces/product';
import InputSearchProductWithSelect from '../../components/Input/Search/SelectProduct';
import { productService } from '../../services/Product';
import useDebounce from '../../hooks/useDebounce';
import './index.css';

type StockMovementSearch = {
  name: string;
  page: number;
  date?: Date;
};

const StockMovement = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { throwError } = useMessage();

  const controlDefault: StockMovementSearch = {
    name: '',
    page: 1,
  };

  const [lastControl, setLastControl] =
    useState<StockMovementSearch>(controlDefault);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);

  const [loading, setLoading] = useState<boolean>(false);
  const [stockMovements, setStockMovements] = useState<IStockMovement[]>([]);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct>();

  const fetchNewData = async () => {
    if (!product) return throwError('Nenhum produto selecionado');
    if (!loading) setLoading(true);
    let newStockMovements: IStockMovement[] = [];
    let newLoadMore = true;

    const newControl: StockMovementSearch = {
      name: lastControl.name,
      page: lastControl.page + 1,
      date: new Date(),
    };

    try {
      newStockMovements = await stockMovementService.findByCompany({
        product_id: product.id_product,
        page: newControl.page,
      });

      if (newStockMovements.length < 20) newLoadMore = false;

      setStockMovements(prev => [...prev, ...newStockMovements]);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      setLoadMore(newLoadMore);
      setLastControl(newControl);
      setLoading(false);
    }
  };

  const fetchData = async (searchedProduct: IProduct) => {
    if (!searchedProduct) return throwError('Nenhum produto selecionado');
    if (!loading) setLoading(true);
    let newStockMovements;
    let newLoadMore = true;

    const newControl: StockMovementSearch = {
      name: search,
      page: 1,
      date: new Date(),
    };
    try {
      newStockMovements = await stockMovementService.findByCompany({
        product_id: searchedProduct.id_product,
        page: newControl.page,
      });

      if (newStockMovements.length < 20) newLoadMore = false;

      setProduct(searchedProduct);
      setStockMovements(newStockMovements);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      setLoadMore(newLoadMore);
      setLastControl(newControl);
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoadingSearch(true);
    let products: IProduct[];
    try {
      products = await productService.searchByName({
        name: debouncedSearch,
        page: 1,
      });

      setProducts(products);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleCreateStockMovement = () => {
    if (!product) return throwError('Nenhum produto selecionado');
    navigate('/stock_movement/create', { state: product });
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch]);

  useEffect(() => {
    if (state) fetchData(state);
  }, []);

  return (
    <div className="main">
      <div className="main_container">
        <header className="header">
          <span>Movimentações de Estoque</span>
          <Button
            icon="plus"
            text="Cadastrar Movimentação"
            style={{ maxWidth: 210 }}
            onClick={() => handleCreateStockMovement()}
          />
        </header>
        <div className="stock_movement_body">
          <div className="stock_movement_content">
            <div style={{ maxWidth: 476 }}>
              <InputSearchProductWithSelect
                name="name"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onSelect={fetchData}
                products={products}
                loading={loadingSearch}
              />
            </div>
            <div className="stock_movement_current_situation">
              <span>Produto selecionado: {product ? product.name : ''}</span>
              {lastControl.date && (
                <span>Última atualização: {formatDate(lastControl.date)}</span>
              )}
              <img src={assets.refresh} onClick={() => fetchProducts()} />
            </div>

            <TableStockMovement
              stock_movements={stockMovements}
              loading={loading}
              loadMore={loadMore}
              fetchMore={fetchNewData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockMovement;
