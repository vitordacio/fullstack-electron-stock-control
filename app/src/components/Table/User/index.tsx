import React from 'react';
import { IUser } from '../../../interfaces/user';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';

type TableUserProps = {
  users: IUser[];
  loading: boolean;
  loadMore: boolean;
  fetchMore?: () => void;
};

const TableUser: React.FC<TableUserProps> = ({
  users,
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
          <th style={{ minWidth: 200 }}>E-mail</th>
          <th style={{ minWidth: 120 }}>Nome de usuário</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <Loading />
        ) : (
          <>
            {users &&
              users.length !== 0 &&
              users.map(user => (
                <tr
                  key={user.id_user}
                  onClick={() => navigate(`/user/${user.id_user}`)}
                >
                  <td style={{ width: '100%' }}>{user.name}</td>
                  <td style={{ minWidth: 200 }}>{user.email}</td>
                  <td style={{ minWidth: 120 }}>{user.username}</td>
                </tr>
              ))}
            {loadMore && <span onClick={fetchMore}>Carregar mais...</span>}
          </>
        )}
      </tbody>
    </table>
  );
};

export default TableUser;
