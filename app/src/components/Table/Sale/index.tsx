import React from 'react';
import { ISale } from '../../../interfaces/sale';
import { formatNumberToPrice } from '../../../utils/formatPrice';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';
import { formatDateWithTz } from '../../../utils/formatDate';

type TableSaleProps = {
  sales: ISale[];
  loading: boolean;
  loadMore: boolean;
  fetchMore?: () => void;
};

const TableSale: React.FC<TableSaleProps> = ({
  sales,
  loading,
  loadMore,
  fetchMore,
}) => {
  const navigate = useNavigate();
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>Data</th>
          <th>Vendedor</th>
          <th>Recebido</th>
          <th>Troco</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <Loading />
        ) : (
          <>
            {sales &&
              sales.length !== 0 &&
              sales.map(sale => (
                <tr
                  key={sale.id_sale}
                  onClick={() => navigate(`/sale/${sale.id_sale}`)}
                >
                  <td style={{ width: '100%' }}>
                    {formatDateWithTz(sale.created_at)}
                  </td>
                  <td>{sale.author.name}</td>
                  <td>{formatNumberToPrice(sale.received)}</td>
                  <td>{formatNumberToPrice(sale.change)}</td>
                  <td>{formatNumberToPrice(sale.total)}</td>
                </tr>
              ))}
            {loadMore && <span onClick={fetchMore}>Carregar mais...</span>}
          </>
        )}
      </tbody>
    </table>
  );
};

export default TableSale;
