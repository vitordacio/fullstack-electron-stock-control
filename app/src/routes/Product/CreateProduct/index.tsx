import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { formatMoney } from '../../../utils/formatMoney';
import InputNumber from '../../../components/Input/Number';
import InputSelectCategory from '../../../components/Input/Select/SelectCategory';
import { productService } from '../../../services/Product';
import { ICreateProduct } from '../../../services/Product/IProductService';

const CreateProduct = () => {
  const { throwInfo, throwError } = useMessage();
  const navigate = useNavigate();

  const [form, setForm] = useState<ICreateProduct>({
    name: '',
    code: '',
    category_id: '',
    price: Number(0).toFixed(2) as unknown as number,
    price_cost: undefined,
    stock_local_qtd: 0,
    stock_local_min: undefined,
    stock_local_max: undefined,
    stock_store_qtd: 0,
    stock_store_min: undefined,
    stock_store_max: undefined,
    actived: true,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const isPrice = ['price', 'price_cost'].includes(e.target.name);
    setForm(prev => ({
      ...prev,
      [e.target.name]: !isPrice ? e.target.value : formatMoney(e.target.value),
    }));
  };

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name) return throwError('Informe o nome do produto');
    if (form.name.length < 3)
      return throwError('Nome do produto deve ter ao menos 3 caracteres');
    if (!form.price) return throwError('Informe o preço do produto');

    setLoading(true);

    try {
      await productService.createProduct(form);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      throwInfo('Produto criado com sucesso!');
      navigate(-1);
    }
  };

  return (
    <div className="main">
      <div
        className="main_container"
        style={{ paddingLeft: 10, paddingRight: 10 }}
      >
        <header className="header" style={{ padding: 0 }}>
          <span>Produtos</span>
        </header>
        <form onSubmit={handleCreateProduct} className="form_default">
          <div className="form_basics">
            <h1>Cadastrar novo produto</h1>
            <div>
              <h3>Dados Básicos</h3>
              <span>(*) Campos obrigatórios</span>
            </div>
          </div>
          <div className="form_content">
            <div className="form_line">
              <div style={{ width: '100%' }}>
                <Input
                  title="Nome *"
                  name="name"
                  value={form.name}
                  onChange={e => handleChange(e)}
                />
              </div>

              <Input
                title="Código"
                name="code"
                value={form.code}
                onChange={e => handleChange(e)}
                minWidth={250}
              />

              <InputSelectCategory
                name="category_id"
                onChange={e => handleChange(e)}
                minWidth={250}
                value={form.category_id}
              />
            </div>

            <div className="form_line">
              <InputNumber
                title="Preço de venda *"
                name="price"
                value={form.price}
                onChange={e => handleChange(e)}
                minWidth={250}
                toFixed={true}
              />

              <InputNumber
                title="Preço de custo"
                name="price_cost"
                value={form.price_cost}
                onChange={e => handleChange(e)}
                minWidth={250}
                toFixed={true}
              />
            </div>

            <h3>Estoque Local</h3>
            <div className="form_line">
              <InputNumber
                title="Quantidade local"
                name="stock_local_qtd"
                onChange={e => handleChange(e)}
                minWidth={250}
                value={form.stock_local_qtd}
              />

              <InputNumber
                title="Mínimo"
                name="stock_local_min"
                onChange={e => handleChange(e)}
                minWidth={250}
                value={form.stock_local_min}
              />

              <InputNumber
                title="Máximo"
                name="stock_local_max"
                onChange={e => handleChange(e)}
                minWidth={250}
                value={form.stock_local_max}
              />
            </div>

            <h3>Estoque Em Loja</h3>
            <div className="form_line">
              <InputNumber
                title="Quantidade Em Loja"
                name="stock_store_qtd"
                onChange={e => handleChange(e)}
                minWidth={250}
                value={form.stock_store_qtd}
              />

              <InputNumber
                title="Mínimo"
                name="stock_store_min"
                onChange={e => handleChange(e)}
                minWidth={250}
                value={form.stock_store_min}
              />

              <InputNumber
                title="Máximo"
                name="stock_store_max"
                onChange={e => handleChange(e)}
                minWidth={250}
                value={form.stock_store_max}
              />
            </div>

            <div className="form_line">
              <span>Produto Ativo:</span>
              <input
                name="create_product_actived"
                type="checkbox"
                checked={form.actived}
                onChange={() =>
                  setForm(prev => ({
                    ...prev,
                    actived: !form.actived,
                  }))
                }
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

export default CreateProduct;
