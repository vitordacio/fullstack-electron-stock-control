import React from 'react';
import { IProduct } from '../../../../interfaces/product';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Loading';
import assets from '../../../../assets';

type TableProductProps = {
  products: IProduct[];
  loading: boolean;
};

const TableProductAlert: React.FC<TableProductProps> = ({
  products,
  loading,
}) => {
  const navigate = useNavigate();
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>Nome</th>
          <th>Min. Local</th>
          <th>Qtd. Local</th>
          <th>Máx. Local</th>
          <th>Min. em Loja</th>
          <th>Qtd. em Loja</th>
          <th>Máx. em Loja</th>
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
                  <td>{product.stock_local_min}</td>
                  <td>{product.stock_local_qtd}</td>
                  <td>{product.stock_local_max}</td>
                  <td>{product.stock_store_min}</td>
                  <td>{product.stock_store_qtd}</td>
                  <td>{product.stock_store_max}</td>
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
          </>
        )}
      </tbody>
    </table>
  );
};

export default TableProductAlert;
