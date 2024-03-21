import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { formatMoney } from '../../utils/formatMoney';
import { IProduct } from '../../interfaces/product';
import { productService } from '../../services/Product';
import Button from '../../components/Button';
import InputSearchProductWithSelect from '../../components/Input/Search/SelectProduct';
import { useMessage } from '../../contexts/message';
import './index.css';
import { formatNumberToPrice } from '../../utils/formatPrice';
import InputNumber from '../../components/Input/Number';
import TableCheckout, { CheckoutProps } from '../../components/Table/Checkout';
import { saleService } from '../../services/Sale';

type SelectProduct = {
  qtd: number;
  product_subtotal: string;
};

type InsertedProduct = SelectProduct & {
  product: IProduct;
};

const Checkout = () => {
  const { throwInfo, throwError } = useMessage();

  const defaultZero = Number(0).toFixed(2);
  const qtdDefault = {
    qtd: 1,
    product_subtotal: defaultZero,
  };
  const [formQtd, setQtdForm] = useState<SelectProduct>(qtdDefault);

  const paymentDefault = {
    cash: defaultZero,
    pix: defaultZero,
    debit: defaultZero,
    credit: defaultZero,
  };
  const [formPayments, setFormPayments] = useState(paymentDefault);

  const formDefault = {
    total: defaultZero,
    received: defaultZero,
    change: defaultZero,
    subtotal: defaultZero,
    discount: defaultZero,
  };
  const [form, setForm] = useState(formDefault);

  const [insertedProducts, setInsertedProducts] = useState<InsertedProduct[]>(
    [],
  );

  const [current, setCurrent] = useState<'product' | 'payment'>('product');

  const [products, setProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct | null>();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);

  const handleCreateSale = async () => {
    if (insertedProducts.length === 0)
      return throwError('Nenhum item na sacola');
    if (
      Number(formPayments.cash) === 0 &&
      Number(formPayments.pix) === 0 &&
      Number(formPayments.debit) === 0 &&
      Number(formPayments.credit) === 0
    )
      return throwError('Informe uma forma de pagamento');

    setLoading(true);

    const sale = {
      cash: Number(formPayments.cash),
      pix: Number(formPayments.pix),
      debit: Number(formPayments.debit),
      credit: Number(formPayments.credit),
      discount: Number(form.discount),
      change: Number(form.change),
      received: Number(form.received),
      subtotal: Number(form.subtotal),
      total: Number(form.total),
      stock_movements: insertedProducts.map(item => ({
        store_out: item.qtd,
        product_id: item.product.id_product,
        price: item.product.price,
      })),
    };

    try {
      await saleService.createSale(sale);

      throwInfo('Venda cadastrada com sucesso');
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      setLoading(false);
      handleReset();
    }
  };

  const handleChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPayments = formPayments;

    newPayments = {
      ...newPayments,
      [e.target.name]: e.target.value
        ? formatMoney(e.target.value)
        : defaultZero,
    };

    const received = Object.values(newPayments).reduce(
      (acc, value) => acc + Number(value),
      0,
    );

    const change =
      received > Number(form.total) ? received - Number(form.total) : 0;

    setFormPayments(newPayments);
    setForm(prev => ({
      ...prev,
      received: received.toFixed(2),
      change: change.toFixed(2),
    }));
  };

  const handleQtd = (type: 'minus' | 'plus') => {
    if (!product) return;
    let newQtd = 0;
    if (type === 'minus') {
      newQtd = formQtd.qtd > 1 ? formQtd.qtd - 1 : 1;
    } else {
      newQtd = formQtd.qtd + 1;
    }

    const subtotal = newQtd * Number(product.price);

    setQtdForm(prev => ({
      ...prev,
      qtd: newQtd,
      product_subtotal: subtotal.toFixed(2),
    }));
  };

  const handleQtdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product) return;
    const newQtd = Number(e.target.value) > 1 ? Number(e.target.value) : 1;

    const subtotal = newQtd * Number(product.price);

    setQtdForm(prev => ({
      ...prev,
      qtd: newQtd,
      product_subtotal: subtotal.toFixed(2),
    }));
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discount = e.target.value ? formatMoney(e.target.value) : defaultZero;
    const total = Number(form.subtotal) - Number(discount);
    const change =
      Number(form.received) > total ? Number(form.received) - total : 0;

    setForm(prev => ({
      ...prev,
      discount,
      total: total.toFixed(2),
      change: change.toFixed(2),
    }));
  };

  const handleSelected = (selectedProduct: IProduct) => {
    setQtdForm({
      qtd: 1,
      product_subtotal: selectedProduct.price.toString(),
    });

    setProduct(selectedProduct);
  };

  const handleInsert = () => {
    if (!product) return throwError('Nenhum produto selecionado');
    const updatedList = insertedProducts;
    const alreadyListedIndex = insertedProducts.findIndex(
      inserted => inserted.product.id_product === product.id_product,
    );

    if (alreadyListedIndex === -1) {
      const newInsert = {
        qtd: formQtd.qtd,
        product_subtotal: formQtd.product_subtotal,
        product: product,
      };
      updatedList.push(newInsert);
    } else {
      insertedProducts[alreadyListedIndex].qtd += formQtd.qtd;
      const subtotal =
        Number(insertedProducts[alreadyListedIndex].product_subtotal) +
        Number(formQtd.product_subtotal);
      insertedProducts[alreadyListedIndex].product_subtotal =
        subtotal.toFixed(2);
    }

    setInsertedProducts(updatedList);

    const newTotal = Number(form.total) + Number(formQtd.product_subtotal);
    const newSubTotal =
      Number(form.subtotal) + Number(formQtd.product_subtotal);
    const newChange =
      Number(form.received) > newTotal ? Number(form.received) - newTotal : 0;

    setForm(prev => ({
      ...prev,
      total: newTotal.toFixed(2),
      subtotal: newSubTotal.toFixed(2),
      change: newChange.toFixed(2),
    }));
    setQtdForm({
      qtd: 1,
      product_subtotal: product.price as unknown as string,
    });
  };

  const handleRemoveInserted = (checkout: CheckoutProps) => {
    const toRemove = insertedProducts.find(
      inserted => inserted.product.id_product === checkout.product.id_product,
    );
    if (!toRemove) return throwError('Produto não encontrado');

    const filteredList = insertedProducts.filter(
      inserted => inserted.product.id_product !== toRemove.product.id_product,
    );
    setInsertedProducts(filteredList);

    const newTotal = Number(form.total) - Number(toRemove.product_subtotal);
    const newSubtotal =
      Number(form.subtotal) - Number(toRemove.product_subtotal);
    const newChange =
      Number(form.received) > newTotal ? Number(form.received) - newTotal : 0;

    setForm(prev => ({
      ...prev,
      total: newTotal.toFixed(2),
      subtotal: newSubtotal.toFixed(2),
      change: newChange.toFixed(2),
    }));
  };

  const handleReset = () => {
    setForm(formDefault);
    setQtdForm(qtdDefault);
    setFormPayments(paymentDefault);
    setInsertedProducts([]);
    setProduct(null);
    setCurrent('product');
  };

  const fetchProducts = async () => {
    setLoadingSearch(true);
    let products: IProduct[];
    try {
      products = await productService.searchByName({
        name: debouncedSearch,
        page: 1,
      });

      setProducts(products);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      setLoadingSearch(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch]);

  return (
    <div className="main">
      <div className="main_container">
        <header className="header">
          <span>Frente de Caixa</span>
        </header>

        <div className="checkout_body">
          <div className="checkout">
            <div>
              <div className="checkout_select_options">
                <span
                  className={`checkout_select_product${
                    current === 'product' ? ` checkout_selected` : ''
                  }`}
                  onClick={() => setCurrent('product')}
                >
                  Produto
                </span>
                <span
                  className={`checkout_select_payment${
                    current === 'payment' ? ` checkout_selected` : ''
                  }`}
                  onClick={() => setCurrent('payment')}
                >
                  Pagamento
                </span>
              </div>
              {current === 'product' && (
                <div className="checkout_product">
                  <div className="checkout_product_input">
                    <InputSearchProductWithSelect
                      name="name"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      onSelect={handleSelected}
                      products={products}
                      loading={loadingSearch}
                    />
                  </div>
                  {product ? (
                    <div className="form_default">
                      <div className="form_basics">
                        <h1>{product.name}</h1>
                        <div>
                          <h3>Preço venda</h3>
                          <span style={{ fontSize: 15 }}>
                            R${formatNumberToPrice(product.price)}
                          </span>
                        </div>
                        <div className="form_line">
                          <InputNumber
                            name="qtd"
                            title="Quantidade *"
                            value={formQtd.qtd}
                            onChange={e => handleQtdChange(e)}
                            handleQtd={handleQtd}
                          />

                          <InputNumber
                            title="Subtotal"
                            name="product_subtotal"
                            value={
                              formQtd.product_subtotal as unknown as number
                            }
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="checkout_insert_button">
                        <Button
                          type="button"
                          text="Inserir"
                          customClass="transparent"
                          onClick={handleInsert}
                          style={{ maxWidth: 200 }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span>Nenhum produto selecionado</span>
                  )}
                </div>
              )}
              {current === 'payment' && (
                <div className="checkout_payment">
                  <div className="form_default">
                    <div className="form_basics">
                      <div className="form_line">
                        <InputNumber
                          title="Dinheiro"
                          name="cash"
                          value={formPayments.cash as unknown as number}
                          onChange={e => handleChangePayment(e)}
                        />
                        <InputNumber
                          title="Pix"
                          name="pix"
                          value={formPayments.pix as unknown as number}
                          onChange={e => handleChangePayment(e)}
                        />
                      </div>

                      <div className="form_line">
                        <InputNumber
                          title="Débito"
                          name="debit"
                          value={formPayments.debit as unknown as number}
                          onChange={e => handleChangePayment(e)}
                        />
                        <InputNumber
                          title="Crédito"
                          name="credit"
                          value={formPayments.credit as unknown as number}
                          onChange={e => handleChangePayment(e)}
                        />
                      </div>

                      <div>
                        <h3>Totais</h3>
                      </div>
                      <div className="form_line">
                        <InputNumber
                          title="Rebecido"
                          name="received"
                          value={form.received as unknown as number}
                          disabled={true}
                        />
                        <InputNumber
                          title="Troco"
                          name="change"
                          value={form.change as unknown as number}
                          disabled={true}
                        />
                      </div>
                      <div className="form_line">
                        <InputNumber
                          title="Sub Total"
                          name="subtotal"
                          value={form.subtotal as unknown as number}
                          disabled={true}
                        />
                        <InputNumber
                          title="Desconto"
                          name="discount"
                          value={form.discount as unknown as number}
                          onChange={e => handleDiscountChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="checkout_resume">
              <TableCheckout
                checkouts={insertedProducts}
                remove={handleRemoveInserted}
              />
            </div>
          </div>
          <div className="checkout_footer">
            <div className="checkout_buttons">
              <Button
                type="button"
                text="Limpar Venda"
                customClass="transparent"
                onClick={handleReset}
                style={{ maxWidth: 200 }}
              />
              <Button
                type="button"
                text="Finalizar Venda"
                onClick={handleCreateSale}
                style={{ maxWidth: 450 }}
                loading={loading}
              />
            </div>
            <div className="checkout_total">
              <span>Total</span>
              <label>{form.total}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
