import { useLocation, useNavigate } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { useState } from 'react';
import Button from '../../../components/Button';
import { formatMoney } from '../../../utils/formatMoney';
import InputNumber from '../../../components/Input/Number';
import { ICreateStockMovement } from '../../../services/StockMovement/IStockMovementService';
import { stockMovementService } from '../../../services/StockMovement';

const CreateStockMovement = () => {
  const { throwInfo, throwError } = useMessage();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [form, setForm] = useState<ICreateStockMovement>({
    product_id: state.id_product,
    price: undefined,
    local_in: undefined,
    local_out: undefined,
    store_in: undefined,
    store_out: undefined,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const isPrice = ['price'].includes(e.target.name);
    setForm(prev => ({
      ...prev,
      [e.target.name]: !isPrice ? e.target.value : formatMoney(e.target.value),
    }));
  };

  const handleCreateStockMovement = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setLoading(true);

    let newStockMovement;

    try {
      newStockMovement = await stockMovementService.createStockMovement(form);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (newStockMovement) {
        throwInfo('Movimentação criada com sucesso!');
        navigate('/stock_movement', { state });
        // navigate(-1);
      }
    }
  };

  return (
    <div className="main">
      <div
        className="main_container"
        style={{ paddingLeft: 10, paddingRight: 10 }}
      >
        <header className="header" style={{ padding: 0 }}>
          <span>Movimentações de Estoque</span>
        </header>
        <form onSubmit={handleCreateStockMovement} className="form_default">
          <div className="form_basics">
            <h1>Cadastrar nova movimentação</h1>

            <div>
              <h3>Dados Básicos</h3>
              <span>(*) Campos obrigatórios</span>
            </div>
            <span
              style={{
                display: 'flex',
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              Produto: {state.name}
            </span>
          </div>
          <div className="form_content">
            <div className="form_line">
              <InputNumber
                title="Preço unitário"
                name="price"
                value={form.price}
                onChange={e => handleChange(e)}
                minWidth={250}
                toFixed={true}
              />
            </div>

            <h3>Estoque Local</h3>
            <div className="form_line">
              <InputNumber
                title="Entrada de Estoque Local"
                name="local_in"
                onChange={e => handleChange(e)}
                value={form.local_in}
                minWidth={250}
              />

              <InputNumber
                title="Saída de Estoque Local"
                name="local_out"
                value={form.local_out}
                onChange={e => handleChange(e)}
                minWidth={250}
              />
            </div>

            <h3>Estoque Em Loja</h3>
            <div className="form_line">
              <InputNumber
                title="Entrada de Estoque em Loja"
                name="store_in"
                value={form.store_in}
                onChange={e => handleChange(e)}
                minWidth={250}
              />

              <InputNumber
                title="Saída de Estoque em Loja"
                name="store_out"
                value={form.store_out}
                onChange={e => handleChange(e)}
                minWidth={250}
              />
            </div>
          </div>

          <div className="space_between">
            <Button
              type="button"
              text="Cancelar"
              customClass="transparent"
              onClick={() => navigate('/product')}
              style={{ maxWidth: 160 }}
            />
            <Button
              type="submit"
              text="Confirmar"
              loading={loading}
              style={{ maxWidth: 160 }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStockMovement;
