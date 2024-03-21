import { useMessage } from '../../../contexts/message';
import { useEffect, useState } from 'react';
import situationOptions from './situationOptions';
import { IProduct } from '../../../interfaces/product';
import { productService } from '../../../services/Product';
import assets from '../../../assets';
import InputSelect from '../../../components/Input/Select';
import Button from '../../../components/Button';
import { formatDate } from '../../../utils/formatDate';
import Loading from '../../../components/Loading';
import TableProductAlert from '../../../components/Table/Product/Alert';

const ProductAlert = () => {
  const { throwError } = useMessage();

  const [closeFilter, setCloseFilter] = useState<boolean>(false);

  const [situation, setSituation] = useState<string>('');

  const [result, setResult] = useState<{ products: IProduct[]; count: number }>(
    {
      products: [],
      count: 0,
    },
  );

  const [lastUpdate, setLastUpdate] = useState<Date>();

  const [loading, setLoading] = useState<boolean>(true);

  const handleSituationTitle = (current: string) => {
    const option = situationOptions.find(
      situation => situation.value === current,
    );

    return option ? option.name : '';
  };

  const fetchData = async () => {
    if (!loading) setLoading(true);
    let newResult;
    const date = new Date();

    try {
      newResult = await productService.findAlert(situation);
      setResult(newResult);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      setLastUpdate(date);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [situation]);

  return (
    <div className="main">
      <div className="main_container">
        <header className="header">
          <span>Alerta de Estoque</span>
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
                  onChange={e => setSituation(e.target.value)}
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
            <div className="product_current_situation">
              <span>Situação: {handleSituationTitle(situation)}</span>
              {lastUpdate && (
                <span>Última atualização: {formatDate(lastUpdate)}</span>
              )}
              <img src={assets.refresh} onClick={() => fetchData()} />
            </div>

            <TableProductAlert products={result.products} loading={loading} />
          </div>
          <div className="sidebar">
            {loading ? (
              <Loading />
            ) : (
              <div>
                <h3>Informações</h3>
                <span>Quantidade em Alerta</span>
                <label>{result.count}</label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAlert;
