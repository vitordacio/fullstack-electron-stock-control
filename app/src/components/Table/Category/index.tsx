import React from 'react';
import { ICategory } from '../../../interfaces/category';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';

type TableCategoryProps = {
  categories: ICategory[];
  loading: boolean;
  loadMore: boolean;
  fetchMore?: () => void;
};

const TableCategory: React.FC<TableCategoryProps> = ({
  categories,
  loading,
  loadMore,
  fetchMore,
}) => {
  const navigate = useNavigate();
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <Loading />
        ) : (
          <>
            {categories &&
              categories.length !== 0 &&
              categories.map(category => (
                <tr
                  key={category.id_category}
                  onClick={() => navigate(`/category/${category.id_category}`)}
                  style={{
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  <td>{category.name}</td>
                </tr>
              ))}
            {loadMore && <span onClick={fetchMore}>Carregar mais...</span>}
          </>
        )}
      </tbody>
    </table>
  );
};

export default TableCategory;
