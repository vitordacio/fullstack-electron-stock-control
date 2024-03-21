import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import './index.css';
import assets from '../../assets';
import InputSelect from '../../components/Input/Select';
import { useEffect, useState } from 'react';
import InputSearch from '../../components/Input/Search';
import TableProduct from '../../components/Table/Product';
import InputSelectCategory from '../../components/Input/Select/SelectCategory';
import situationOptions from './situationOptions';
import { useMessage } from '../../contexts/message';
import { IProduct } from '../../interfaces/product';
import { productService } from '../../services/Product';
import { formatDate } from '../../utils/formatDate';
import Loading from '../../components/Loading';
import { ICountByCompanyResponse } from '../../services/Product/IProductService';

type ProductSearch = {
  situation: 'latest' | 'actived_true' | 'actived_false' | 'deleted';
  category_id: string;
  name: string;
  page: number;
  date?: Date;
};

const Product = () => {
  const navigate = useNavigate();
  const { throwError } = useMessage();

  const [closeFilter, setCloseFilter] = useState<boolean>(false);

  const controlDefault: ProductSearch = {
    situation: 'latest',
    category_id: '',
    name: '',
    page: 1,
  };

  const [control, setControl] = useState<ProductSearch>(controlDefault);
  const [lastControl, setLastControl] = useState<ProductSearch>(controlDefault);
  const [loadMore, setLoadMore] = useState<boolean>(true);

  const [loadingCount, setLoadingCount] = useState<boolean>(true);
  const [count, setCount] = useState<ICountByCompanyResponse>();

  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setControl(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSituationTitle = (current: string) => {
    const option = situationOptions.find(
      situation => situation.value === current,
    );

    return option ? option.name : '';
  };

  const fetchNewData = async () => {
    let newProducts: IProduct[] = [];
    let newLoadMore = true;
    const newControl: ProductSearch = {
      situation: lastControl.situation,
      category_id: lastControl.category_id,
      name: lastControl.name,
      page: lastControl.page + 1,
      date: new Date(),
    };
    try {
      newProducts = await productService.findByCompany(newControl);
      if (newProducts.length < 20) newLoadMore = false;
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (newProducts.length !== 0)
        setProducts(prev => [...prev, ...newProducts]);
      setLoadMore(newLoadMore);
      setLastControl(newControl);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    if (!loading) setLoading(true);
    let newProducts;
    let newLoadMore = true;
    const newControl: ProductSearch = {
      situation: control.situation,
      category_id: control.category_id,
      name: control.name,
      page: 1,
      date: new Date(),
    };
    try {
      newProducts = await productService.findByCompany(newControl);
      if (newProducts.length < 20) newLoadMore = false;
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (newProducts) setProducts(newProducts);
      setLoadMore(newLoadMore);
      setLastControl(newControl);
      setLoading(false);
    }
  };

  const findCount = async () => {
    let newCount: ICountByCompanyResponse = {
      countTotal: 0,
      countAlertLocal: 0,
      countAlertStore: 0,
    };
    try {
      newCount = await productService.findCountByCompany();
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      setCount(newCount);
      setLoadingCount(false);
    }
  };

  useEffect(() => {
    fetchData();
    findCount();
  }, []);

  return (
    <div className="main">
      <div className="main_container">
        <header className="header">
          <span>Produtos</span>
          <Button
            icon="plus"
            text="Cadastrar Produto"
            style={{ maxWidth: 210 }}
            onClick={() => navigate('/product/create')}
          />
        </header>
        <div className="product_body">
          {closeFilter ? (
            <div className="filter_closed">
              <div onClick={() => setCloseFilter(false)}>
                <img src={assets.filter} />
              </div>
            </div>
          ) : (
            <div
              className="filter_opened"
              style={{
                display: `${closeFilter ? 'none' : 'flex'}`,
              }}
            >
              <div className="close_filters">
                <img src={assets.x} onClick={() => setCloseFilter(true)} />
              </div>
              <div className="filter_title">
                <img src={assets.filter} />
                <h3>Filtrar</h3>
              </div>
              <div className="filter_line">
                <InputSelect
                  name="situation"
                  title="Situação"
                  options={situationOptions}
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className="filter_line">
                <InputSelectCategory
                  name="category_id"
                  onChange={e => handleChange(e)}
                  allOption={true}
                  nullValue="none"
                />
              </div>
              <div className="filter_button">
                <Button
                  customClass="transparent"
                  text="Filtrar"
                  onClick={fetchData}
                />
              </div>
            </div>
          )}
          <div className="product_content">
            <div style={{ maxWidth: 476 }}>
              <InputSearch
                name="name"
                value={control.name}
                onChange={e => handleChange(e)}
                placeholder="Pesquisar por nome ou código"
                onClick={fetchData}
              />
            </div>
            <div className="product_current_situation">
              <span>
                Situação: {handleSituationTitle(lastControl.situation)}
              </span>
              {lastControl.date && (
                <span>Última atualização: {formatDate(lastControl.date)}</span>
              )}
              <img src={assets.refresh} onClick={() => fetchData()} />
            </div>

            <TableProduct
              products={products}
              loading={loading}
              loadMore={loadMore}
              fetchMore={fetchNewData}
            />
          </div>
          <div className="sidebar">
            {loadingCount ? (
              <Loading />
            ) : (
              <>
                {count && (
                  <>
                    <div>
                      <h3>Informações</h3>
                      <span>Quantidade de Produtos</span>
                      <label>{count.countTotal}</label>
                    </div>
                    <div>
                      <h3>Alerta de Estoque</h3>
                      <span>Local</span>
                      <label>{count.countAlertLocal}</label>
                      <span>Loja</span>
                      <label>{count.countAlertStore}</label>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
