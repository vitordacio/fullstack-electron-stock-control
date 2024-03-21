import React from 'react';
import { IProduct } from '../../../interfaces/product';
import { formatNumberToPrice } from '../../../utils/formatPrice';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';
import assets from '../../../assets';

type TableProductProps = {
  products: IProduct[];
  loading: boolean;
  loadMore: boolean;
  fetchMore?: () => void;
};

const TableProduct: React.FC<TableProductProps> = ({
  products,
  loading,
  loadMore,
  fetchMore,
}) => {
  const navigate = useNavigate();
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>Nome</th>
          <th>Código</th>
          <th>Estoque Local</th>
          <th>Estoque Em Loja</th>
          <th>Preço</th>
          <th>Estoque</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <Loading />
        ) : (
          <>
            {products &&
              products.length !== 0 &&
              products.map(product => (
                <tr
                  key={product.id_product}
                  onClick={() => navigate(`/product/${product.id_product}`)}
                >
                  <td style={{ width: '100%' }}>{product.name}</td>
                  <td>{product.code}</td>
                  <td>{product.stock_local_qtd}</td>
                  <td>{product.stock_store_qtd}</td>
                  <td>{formatNumberToPrice(product.price)}</td>
                  <td>
                    <img
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate('/stock_movement', { state: product });
                      }}
                      src={assets.stock}
                      style={{ width: 20, height: 20 }}
                    />
                  </td>
                </tr>
              ))}
            {loadMore && <span onClick={fetchMore}>Carregar mais...</span>}
          </>
        )}
      </tbody>
    </table>
  );
};

export default TableProduct;
