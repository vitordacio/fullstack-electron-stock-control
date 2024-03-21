import { useNavigate, useParams } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { formatMoney } from '../../../utils/formatMoney';
import InputNumber from '../../../components/Input/Number';
import InputSelectCategory from '../../../components/Input/Select/SelectCategory';
import { productService } from '../../../services/Product';
import { IProduct } from '../../../interfaces/product';
import { IUpdateProduct } from '../../../services/Product/IProductService';
import Loading from '../../../components/Loading';
import {
  calculateProfitPercentage,
  formatNumberToPrice,
} from '../../../utils/formatPrice';

const ProductDetails = () => {
  const { throwInfo, throwError } = useMessage();
  const { product_id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState<IUpdateProduct>({
    product_id: '',
    name: '',
    code: '',
    category_id: '',
    price: 0,
    price_cost: 0,
    stock_local_qtd: 0,
    stock_local_min: 0,
    stock_local_max: 0,
    stock_store_qtd: 0,
    stock_store_min: 0,
    stock_store_max: 0,
    actived: true,
  });
  const [count, setCount] = useState({
    stock_movements_count: 0,
    local_in_count: 0,
    local_out_count: 0,
    store_in_count: 0,
    store_out_count: 0,
  });
  const [product, setProduct] = useState<IProduct>();
  const [loadingData, setLoadingData] = useState<boolean>(true);
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

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let fetchProduct: IProduct | undefined;
    if (!form.name) return throwError('Informe o nome do produto');
    if (form.name.length < 3)
      return throwError('Nome do produto deve ter ao menos 3 caracteres');
    if (!form.price) return throwError('Informe o preço do produto');

    setLoading(true);

    try {
      fetchProduct = await productService.updateProduct(form);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (fetchProduct) {
        setForm({
          product_id: fetchProduct.id_product,
          name: fetchProduct.name,
          code: fetchProduct.code || '',
          category_id: fetchProduct.category_id || '',
          price: fetchProduct.price.toFixed(2) as unknown as number,
          price_cost: fetchProduct.price_cost
            ? (fetchProduct.price_cost.toFixed(2) as unknown as number)
            : undefined,
          stock_local_qtd: fetchProduct.stock_local_qtd,
          stock_local_min: fetchProduct.stock_local_min || undefined,
          stock_local_max: fetchProduct.stock_local_max || undefined,
          stock_store_qtd: fetchProduct.stock_store_qtd,
          stock_store_min: fetchProduct.stock_store_min || undefined,
          stock_store_max: fetchProduct.stock_store_max || undefined,
          actived: fetchProduct.actived,
        });
        setProduct(fetchProduct);
        throwInfo('Produto atualizado com sucesso!');
      }

      setLoading(false);
    }
  };

  const fetchData = async () => {
    let fetchProduct: IProduct | undefined;
    const newCount = {
      stock_movements_count: 0,
      local_in_count: 0,
      local_out_count: 0,
      store_in_count: 0,
      store_out_count: 0,
    };

    try {
      fetchProduct = await productService.findById(product_id as string);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (fetchProduct) {
        setForm({
          product_id: fetchProduct.id_product,
          name: fetchProduct.name,
          code: fetchProduct.code || '',
          category_id: fetchProduct.category_id || '',
          price: fetchProduct.price,
          price_cost: fetchProduct.price_cost || undefined,
          stock_local_qtd: fetchProduct.stock_local_qtd,
          stock_local_min: fetchProduct.stock_local_min || undefined,
          stock_local_max: fetchProduct.stock_local_max || undefined,
          stock_store_qtd: fetchProduct.stock_store_qtd,
          stock_store_min: fetchProduct.stock_store_min || undefined,
          stock_store_max: fetchProduct.stock_store_max || undefined,
          actived: fetchProduct.actived,
        });
        setProduct(fetchProduct);

        fetchProduct.stock_movements.forEach(movement => {
          newCount.stock_movements_count += 1;
          newCount.local_in_count += Number(movement.local_in);
          newCount.local_out_count += Number(movement.local_out);
          newCount.store_in_count += Number(movement.store_in);
          newCount.store_out_count += Number(movement.store_out);
        });
        setCount(newCount);
      }

      setLoadingData(false);
    }
  };

  const deleteProduct = async () => {
    try {
      await productService.deleteProduct(product_id as string);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      throwInfo('Produto excluído com sucesso!');
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
          <span>Produtos</span>
          {product && !product.deleted_at && (
            <Button
              type="button"
              text="Deletar"
              customClass="red"
              onClick={deleteProduct}
              style={{ maxWidth: 160 }}
            />
          )}
        </header>

        <div className="product_body">
          <form
            onSubmit={handleUpdateProduct}
            className="form_default"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <div className="form_basics">
              <h1>Detalhes do produto</h1>
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
                      value={form.stock_local_qtd}
                      onChange={e => handleChange(e)}
                      minWidth={250}
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
                    loading={loading}
                    type="submit"
                    text="Salvar"
                    style={{ maxWidth: 160 }}
                  />
                </div>
              </>
            )}
          </form>

          <div className="sidebar">
            {loading ? (
              <Loading />
            ) : (
              <>
                {product && (
                  <>
                    <div>
                      <h3>Informações</h3>
                      <span>Margem de Lucro</span>
                      <label
                        style={{
                          color:
                            product.price - product.price_cost < 0 ? 'red' : '',
                        }}
                      >
                        {`R$ ${formatNumberToPrice(
                          product.price - product.price_cost,
                        )} (${calculateProfitPercentage({
                          price: product.price,
                          price_cost: product.price_cost,
                        })}%)`}
                      </label>
                    </div>
                    <div>
                      <h3>Estoque</h3>
                      <span>Número de Movimentações</span>
                      <label>{count.stock_movements_count}</label>
                    </div>
                    <div>
                      <h3>Local</h3>
                      <span>Entradas</span>
                      <label>{count.local_in_count}</label>
                      <span>Saídas</span>
                      <label>{count.local_out_count}</label>
                    </div>
                    <div>
                      <h3>Em Loja</h3>
                      <span>Entradas</span>
                      <label>{count.store_in_count}</label>
                      <span>Saídas</span>
                      <label>{count.store_out_count}</label>
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

export default ProductDetails;
