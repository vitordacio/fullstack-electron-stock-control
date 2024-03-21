import { useNavigate, useParams } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import InputNumber from '../../../components/Input/Number';
import { saleService } from '../../../services/Sale';
import { ISale } from '../../../interfaces/sale';
import Loading from '../../../components/Loading';
import TableStockMovement from '../../../components/Table/StockMovement';
import Input from '../../../components/Input';
import { formatDate } from '../../../utils/formatDate';

const SaleDetails = () => {
  const { throwInfo, throwError } = useMessage();
  const { sale_id } = useParams();

  const navigate = useNavigate();

  const [sale, setSale] = useState<ISale>();
  const [loading, setLoading] = useState<boolean>(true);

  const deleteSale = async () => {
    try {
      await saleService.deleteSale(sale_id as string);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      throwInfo('Venda excluída com sucesso!');
      navigate(-1);
    }
  };

  const fetchData = async () => {
    let fetchSale: ISale | undefined;
    try {
      fetchSale = await saleService.findById(sale_id as string);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (fetchSale) {
        setSale(fetchSale);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      <div className="main_container">
        <header className="header">
          <span>Vendas</span>
          <Button
            type="button"
            text="Deletar"
            customClass="red"
            onClick={deleteSale}
            style={{ maxWidth: 160 }}
          />
        </header>

        <div className="sale_body">
          <div
            className="form_default"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <div className="form_basics">
              <h1>Detalhes da venda</h1>
              <div>
                <h3>Dados Básicos</h3>
                <span>(*) Campos obrigatórios</span>
              </div>
            </div>
            {loading ? (
              <Loading size={54} />
            ) : (
              <>
                {sale && (
                  <div className="form_content">
                    <h3>Pagamentos</h3>

                    <div className="form_line">
                      <InputNumber
                        title="Dinheiro"
                        name="cash"
                        value={sale.cash}
                        disabled={true}
                      />
                      <InputNumber
                        title="Pix"
                        name="pix"
                        value={sale.pix}
                        disabled={true}
                      />
                    </div>

                    <div className="form_line">
                      <InputNumber
                        title="Débito"
                        name="debit"
                        value={sale.debit}
                        disabled={true}
                      />
                      <InputNumber
                        title="Crédito"
                        name="credit"
                        value={sale.credit}
                        disabled={true}
                      />
                    </div>
                    <h3>Totais</h3>
                    <div className="form_line">
                      <InputNumber
                        title="Rebecido"
                        name="received"
                        value={sale.received}
                        disabled={true}
                      />
                      <InputNumber
                        title="Troco"
                        name="change"
                        value={sale.change}
                        disabled={true}
                      />
                    </div>
                    <div className="form_line">
                      <InputNumber
                        title="Sub Total"
                        name="subtotal"
                        value={sale.subtotal}
                        disabled={true}
                      />
                      <InputNumber
                        title="Desconto"
                        name="discount"
                        value={sale.discount}
                        disabled={true}
                      />
                    </div>
                    <h3>Movimentações de Estoque</h3>
                    <TableStockMovement
                      stock_movements={sale.stock_movements}
                      loading={false}
                      loadMore={false}
                      name={true}
                    />
                    <h3>Vendedor</h3>
                    <div className="form_line">
                      <Input
                        title=""
                        name="author"
                        value={sale.author.name}
                        disabled={true}
                      />
                    </div>
                  </div>
                )}

                <div className="space_between">
                  <Button
                    type="button"
                    text="Cancelar"
                    customClass="transparent"
                    onClick={() => navigate(-1)}
                    style={{ maxWidth: 160 }}
                  />
                  <Button
                    loading={loading}
                    type="submit"
                    text="Salvar"
                    style={{ maxWidth: 160 }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="sidebar">
            {loading ? (
              <Loading />
            ) : (
              <>
                {sale && (
                  <>
                    <div>
                      <h3>Informações</h3>
                      <span>Data de Criação</span>
                      <label>{formatDate(sale.created_at)}</label>
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

export default SaleDetails;
