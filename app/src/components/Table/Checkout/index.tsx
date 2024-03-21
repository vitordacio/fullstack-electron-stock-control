import React from 'react';
import { IProduct } from '../../../interfaces/product';
import { formatNumberToPrice } from '../../../utils/formatPrice';
import assets from '../../../assets';

export type CheckoutProps = {
  qtd: number;
  product_subtotal: string;
  product: IProduct;
};

type TableCheckoutProps = {
  checkouts: CheckoutProps[];
  remove: (checkout: CheckoutProps) => void;
};

const TableCheckout: React.FC<TableCheckoutProps> = ({ checkouts, remove }) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>Produto</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Sub Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <>
          {checkouts &&
            checkouts.length !== 0 &&
            checkouts.map(checkout => (
              <tr key={checkout.product.id_product} style={{ cursor: 'auto' }}>
                <td style={{ width: '100%' }}>{checkout.product.name}</td>
                <td>{checkout.qtd}</td>
                <td>{formatNumberToPrice(checkout.product.price)}</td>
                <td>{checkout.product_subtotal}</td>
                <td
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingRight: 5,
                  }}
                >
                  <img
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      remove(checkout);
                    }}
                    src={assets.trash}
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                  />
                </td>
              </tr>
            ))}
        </>
      </tbody>
    </table>
  );
};

export default TableCheckout;
