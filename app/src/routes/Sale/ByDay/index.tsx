import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { formatDate, formatResumeDate } from '../../../utils/formatDate';
import { ISale } from '../../../interfaces/sale';
import { saleService } from '../../../services/Sale';
import Button from '../../../components/Button';
import assets from '../../../assets';
import TableSale from '../../../components/Table/Sale';
import Loading from '../../../components/Loading';
import { formatNumberToPrice } from '../../../utils/formatPrice';

const SaleByDay = () => {
  const navigate = useNavigate();
  const { throwError } = useMessage();

  const [resume, setResume] = useState<{
    sales: ISale[];
    sales_count: number;
    sales_total: number;
  }>();

  const [selectedDate, setSelectedDate] = useState(
    formatResumeDate(new Date()),
  );
  const [lastAtt, setLastAtt] = useState<Date>();

  const [loading, setLoading] = useState<boolean>(true);

  const fetchDataByDay = async () => {
    setLoading(true);

    const now = new Date();
    const date = new Date(selectedDate);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    try {
      const result = await saleService.findByDay({
        year,
        month,
        day,
      });

      setResume({
        sales: result.sales,
        sales_count: result.sales_count,
        sales_total: result.sales_total,
      });
      setLastAtt(now);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) fetchDataByDay();
  }, [selectedDate]);

  return (
    <div className="main">
      <div className="main_container">
        <header className="header">
          <span>Resumo por Dia</span>
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
              <input
                type="date"
                name="dateInput"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="sale_current_situation">
              {lastAtt && (
                <span>Última atualização: {formatDate(lastAtt)}</span>
              )}
              <img src={assets.refresh} onClick={() => fetchDataByDay()} />
            </div>

            {loading ? (
              <Loading />
            ) : (
              <>
                {' '}
                {resume && (
                  <TableSale
                    sales={resume.sales}
                    loading={loading}
                    loadMore={false}
                  />
                )}
              </>
            )}
          </div>

          <div className="sidebar">
            {loading ? (
              <Loading />
            ) : (
              <>
                {resume && (
                  <>
                    <div>
                      <h3>Informações</h3>
                      <span>Quantidade de Vendas</span>
                      <label>{resume.sales_count}</label>
                      <span>Total em Vendas</span>
                      <label>{`R$ ${
                        resume.sales_total
                          ? formatNumberToPrice(resume.sales_total)
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

export default SaleByDay;
