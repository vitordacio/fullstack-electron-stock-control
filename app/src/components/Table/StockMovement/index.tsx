import React from 'react';
import { formatNumberToPrice } from '../../../utils/formatPrice';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';
import { IStockMovement } from '../../../interfaces/stockMovement';
import { formatDateWithTz } from '../../../utils/formatDate';

type TableStockMovementProps = {
  stock_movements: IStockMovement[];
  loading: boolean;
  loadMore: boolean;
  fetchMore?: () => void;
  name?: boolean;
};

const TableStockMovement: React.FC<TableStockMovementProps> = ({
  stock_movements,
  loading,
  loadMore,
  fetchMore,
  name,
}) => {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>{name ? 'Produto' : 'Data'}</th>
          <th>Entrada Local</th>
          <th>Saída Local</th>
          <th>Entrada Em Loja</th>
          <th>Saída Em Loja</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <Loading />
        ) : (
          <>
            {stock_movements &&
              stock_movements.length !== 0 &&
              stock_movements.map(stock_movement => (
                <tr
                  key={stock_movement.id_stock_movement}
                  onClick={() =>
                    navigate(
                      `/stock_movement/${stock_movement.id_stock_movement}`,
                    )
                  }
                >
                  <td style={{ width: '100%' }}>
                    {name
                      ? stock_movement.product.name
                      : formatDateWithTz(stock_movement.created_at)}
                  </td>
                  <td>{stock_movement.local_in || '--'}</td>
                  <td>{stock_movement.local_out || '--'}</td>
                  <td>{stock_movement.store_in || '--'}</td>
                  <td>{stock_movement.store_out || '--'}</td>
                  <td>
                    {stock_movement.price
                      ? formatNumberToPrice(stock_movement.price)
                      : '--'}
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

export default TableStockMovement;
