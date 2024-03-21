import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import assets from '../../assets';
import { useEffect, useState } from 'react';
import TableSale from '../../components/Table/Sale';
import { useMessage } from '../../contexts/message';
import { saleService } from '../../services/Sale';
import { formatDate } from '../../utils/formatDate';
import { ISale } from '../../interfaces/sale';
import './index.css';
import Loading from '../../components/Loading';
import { formatNumberToPrice } from '../../utils/formatPrice';

type SaleSearch = {
  page: number;
  date?: Date;
};

const Sale = () => {
  const navigate = useNavigate();
  const { throwError } = useMessage();

  const controlDefault: SaleSearch = {
    page: 1,
  };

  const [lastControl, setLastControl] = useState<SaleSearch>(controlDefault);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [sales, setSales] = useState<ISale[]>([]);

  const [loadingCount, setLoadingCount] = useState<boolean>(true);
  const [count, setCount] = useState<{
    sales_count: number;
    sales_total: number;
  }>();

  const fetchNewData = async () => {
    if (!loading) setLoading(true);
    let newSales: ISale[] = [];
    let newLoadMore = true;

    const newControl: SaleSearch = {
      page: lastControl.page + 1,
      date: new Date(),
    };

    try {
      newSales = await saleService.findByCompany({
        page: newControl.page,
      });

      if (newSales.length < 20) newLoadMore = false;

      setSales(prev => [...prev, ...newSales]);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      setLoadMore(newLoadMore);
      setLastControl(newControl);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    if (!loading) setLoading(true);
    let newSales;
    let newLoadMore = true;

    const newControl: SaleSearch = {
      page: 1,
      date: new Date(),
    };
    try {
      newSales = await saleService.findByCompany({
        page: newControl.page,
      });

      if (newSales.length < 20) newLoadMore = false;

      setSales(newSales);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      setLoadMore(newLoadMore);
      setLastControl(newControl);
      setLoading(false);
    }
  };

  const fetchCount = async () => {
    let newCount;
    try {
      newCount = await saleService.findCountByCompany();
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (newCount) setCount(newCount);
      setLoadingCount(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCount();
  }, []);

  return (
    <div className="main">
      <div className="main_container">
        <header className="header">
          <span>Vendas</span>
          <Button
            icon="plus"
            text="Cadastrar Venda"
            style={{ maxWidth: 210 }}
            onClick={() => navigate('/checkout')}
          />
        </header>
        <div className="sale_body">
          <div className="sale_content">
            <div className="sale_current_situation">
              {lastControl.date && (
                <span>Última atualização: {formatDate(lastControl.date)}</span>
              )}
              <img src={assets.refresh} onClick={() => fetchData()} />
            </div>

            <TableSale
              sales={sales}
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
                      <span>Quantidade de Vendas</span>
                      <label>{count.sales_count}</label>
                      <span>Total em Vendas</span>
                      <label>{`R$ ${
                        count.sales_total
                          ? formatNumberToPrice(count.sales_total)
                          : '0,00'
                      }`}</label>
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

export default Sale;
