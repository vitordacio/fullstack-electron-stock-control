import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { formatDate } from '../../../utils/formatDate';
import { ISale } from '../../../interfaces/sale';
import { saleService } from '../../../services/Sale';
import Button from '../../../components/Button';
import assets from '../../../assets';
import TableSale from '../../../components/Table/Sale';
import Loading from '../../../components/Loading';
import { formatNumberToPrice } from '../../../utils/formatPrice';
import InputNumber from '../../../components/Input/Number';

const SaleByMonth = () => {
  const navigate = useNavigate();
  const { throwError } = useMessage();

  const now = new Date();
  const currentYear = now.getUTCFullYear().toString();
  const currentMonth = (now.getUTCMonth() + 1).toString().padStart(2, '0');

  const [resume, setResume] = useState<{
    sales: ISale[];
    sales_count: number;
    sales_total: number;
  }>();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const [lastAtt, setLastAtt] = useState<Date>();

  const [loading, setLoading] = useState<boolean>(true);

  const fetchDataByMonth = async () => {
    setLoading(true);

    try {
      const result = await saleService.findByMonth({
        year: Number(selectedYear),
        month: Number(selectedMonth),
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
    fetchDataByMonth();
  }, []);

  return (
    <div className="main">
      <div className="main_container">
        <header className="header">
          <span>Resumo por Mês</span>
          <Button
            icon="plus"
            text="Cadastrar Venda"
            style={{ maxWidth: 210 }}
            onClick={() => navigate('/checkout')}
          />
        </header>
        <div className="sale_body">
          <div className="sale_content">
            <div className="sale_current_situation space_between">
              <div>
                <InputNumber
                  title="Ano"
                  name="year"
                  value={Number(selectedYear)}
                  onChange={e => setSelectedYear(e.target.value)}
                />
              </div>
              <select value={selectedMonth} onChange={handleMonthChange}>
                <option value="">Selecione o mês</option>
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>

              <Button
                text="Pesquisar"
                onClick={fetchDataByMonth}
                style={{ maxWidth: 200 }}
              />
            </div>
            <div className="sale_current_situation">
              {lastAtt && (
                <span>Última atualização: {formatDate(lastAtt)}</span>
              )}
              <img src={assets.refresh} onClick={() => fetchDataByMonth()} />
            </div>

            {loading ? (
              <Loading />
            ) : (
              <>
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

export default SaleByMonth;
