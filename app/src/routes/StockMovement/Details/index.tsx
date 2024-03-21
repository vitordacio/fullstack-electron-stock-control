import { useNavigate, useParams } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import InputNumber from '../../../components/Input/Number';
import Loading from '../../../components/Loading';
import { IStockMovement } from '../../../interfaces/stockMovement';
import { stockMovementService } from '../../../services/StockMovement';
import { IProduct } from '../../../interfaces/product';

type StockMovementDetailsProps = {
  product: IProduct | undefined;
  price: number | undefined;
  local_in: number | undefined;
  local_out: number | undefined;
  store_in: number | undefined;
  store_out: number | undefined;
};

const StockMovementDetails = () => {
  const { throwInfo, throwError } = useMessage();
  const { stock_movement_id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState<StockMovementDetailsProps>({
    product: undefined,
    price: undefined,
    local_in: undefined,
    local_out: undefined,
    store_in: undefined,
    store_out: undefined,
  });
  const [stockMovement, setStockMovement] = useState<IStockMovement>();
  const [loadingData, setLoadingData] = useState<boolean>(true);

  const fetchData = async () => {
    let fetchStockMovement: IStockMovement | undefined;
    try {
      fetchStockMovement = await stockMovementService.findById(
        stock_movement_id as string,
      );
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (fetchStockMovement) {
        setForm({
          product: fetchStockMovement.product,
          price: fetchStockMovement.price,
          local_in: fetchStockMovement.local_in,
          local_out: fetchStockMovement.local_out,
          store_in: fetchStockMovement.store_in,
          store_out: fetchStockMovement.store_out,
        });
        setStockMovement(fetchStockMovement);
      }

      setLoadingData(false);
    }
  };

  const deleteStockMovement = async () => {
    try {
      await stockMovementService.deleteStockMovement(
        stock_movement_id as string,
      );
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      throwInfo('Movimentação excluída com sucesso!');
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      <div className="main_container">
        <header className="header">
          <span>Movimentações de Estoque</span>
          {stockMovement && !stockMovement.deleted_at && (
            <Button
              type="button"
              text="Deletar"
              customClass="red"
              onClick={deleteStockMovement}
              style={{ maxWidth: 160 }}
            />
          )}
        </header>

        <div className="product_body">
          <form
            className="form_default"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <div className="form_basics">
              <h1>Cadastrar nova movimentação</h1>
              <span>Produto: {form.product ? form.product.name : ''}</span>
              <div>
                <h3>Dados Básicos</h3>
                <span>(*) Campos obrigatórios</span>
              </div>
            </div>
            {loadingData ? (
              <Loading size={54} />
            ) : (
              <>
                <div className="form_content">
                  <div className="form_line">
                    <InputNumber
                      title="Preço unitário"
                      name="price"
                      value={form.price}
                      minWidth={250}
                      toFixed={true}
                      disabled={true}
                    />
                  </div>

                  <h3>Estoque Local</h3>
                  <div className="form_line">
                    <InputNumber
                      title="Entrada de Estoque Local"
                      name="local_in"
                      value={form.local_in}
                      minWidth={250}
                      disabled={true}
                    />

                    <InputNumber
                      title="Saída de Estoque Local"
                      name="local_out"
                      value={form.local_out}
                      minWidth={250}
                      disabled={true}
                    />
                  </div>

                  <h3>Estoque Em Loja</h3>
                  <div className="form_line">
                    <InputNumber
                      title="Entrada de Estoque Loja"
                      name="store_in"
                      value={form.store_in}
                      minWidth={250}
                      disabled={true}
                    />

                    <InputNumber
                      title="Saída de Estoque Loja"
                      name="store_out"
                      value={form.store_out}
                      minWidth={250}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="space_between">
                  <Button
                    type="button"
                    text="Voltar"
                    customClass="transparent"
                    onClick={() => navigate(-1)}
                    style={{ maxWidth: 160 }}
                  />
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockMovementDetails;
