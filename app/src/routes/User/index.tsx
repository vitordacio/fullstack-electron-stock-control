import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import './index.css';
import assets from '../../assets';
import InputSelect from '../../components/Input/Select';
import { useEffect, useState } from 'react';
import InputSearch from '../../components/Input/Search';
import TableUser from '../../components/Table/User';
import { useMessage } from '../../contexts/message';
import { IUser } from '../../interfaces/user';
import { userService } from '../../services/User';
import { formatDate } from '../../utils/formatDate';
import Loading from '../../components/Loading';
import situationOptions from './situationOptions';

type UserSearch = {
  situation: 'latest' | 'actived_true' | 'actived_false' | 'deleted';
  name: string;
  page: number;
  date?: Date;
};

const User = () => {
  const navigate = useNavigate();
  const { throwError } = useMessage();

  const [closeFilter, setCloseFilter] = useState<boolean>(false);

  const controlDefault: UserSearch = {
    situation: 'latest',
    name: '',
    page: 1,
  };

  const [control, setControl] = useState<UserSearch>(controlDefault);
  const [lastControl, setLastControl] = useState<UserSearch>(controlDefault);
  const [loadMore, setLoadMore] = useState<boolean>(true);

  const [loadingCount, setLoadingCount] = useState<boolean>(true);
  const [count, setCount] = useState<number>();

  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<IUser[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setControl(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSituationTitle = (current: string) => {
    const option = situationOptions.find(
      situation => situation.value === current,
    );

    return option ? option.name : '';
  };

  const fetchNewData = async () => {
    let newUsers: IUser[] = [];
    let newLoadMore = true;
    const newControl: UserSearch = {
      situation: lastControl.situation,
      name: lastControl.name,
      page: lastControl.page + 1,
      date: new Date(),
    };
    try {
      newUsers = await userService.findByCompany(newControl);
      if (newUsers.length < 20) newLoadMore = false;
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (newUsers.length !== 0) setUsers(prev => [...prev, ...newUsers]);
      setLoadMore(newLoadMore);
      setLastControl(newControl);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    if (!loading) setLoading(true);
    let newUsers;
    let newLoadMore = true;
    const newControl: UserSearch = {
      situation: control.situation,
      name: control.name,
      page: 1,
      date: new Date(),
    };
    try {
      newUsers = await userService.findByCompany(newControl);
      if (newUsers.length < 20) newLoadMore = false;
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (newUsers) setUsers(newUsers);
      setLoadMore(newLoadMore);
      setLastControl(newControl);
      setLoading(false);
    }
  };

  const findCount = async () => {
    let newCount = 0;
    try {
      newCount = await userService.findCountByCompany();
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      setCount(newCount);
      setLoadingCount(false);
    }
  };

  useEffect(() => {
    fetchData();
    findCount();
  }, []);

  return (
    <div className="main">
      <div className="main_container">
        <header className="header">
          <span>Vendedores</span>
          <Button
            icon="plus"
            text="Cadastrar Vendedor"
            style={{ maxWidth: 210 }}
            onClick={() => navigate('/user/create')}
          />
        </header>
        <div className="user_body">
          {closeFilter ? (
            <div className="filter_closed">
              <div onClick={() => setCloseFilter(false)}>
                <img src={assets.filter} />
              </div>
            </div>
          ) : (
            <div
              className="filter_opened"
              style={{
                display: `${closeFilter ? 'none' : 'flex'}`,
              }}
            >
              <div className="close_filters">
                <img src={assets.x} onClick={() => setCloseFilter(true)} />
              </div>
              <div className="filter_title">
                <img src={assets.filter} />
                <h3>Filtrar</h3>
              </div>
              <div className="filter_line">
                <InputSelect
                  name="situation"
                  title="Situação"
                  options={situationOptions}
                  onChange={e => handleChange(e)}
                />
              </div>

              <div className="filter_button">
                <Button
                  customClass="transparent"
                  text="Filtrar"
                  onClick={fetchData}
                />
              </div>
            </div>
          )}
          <div className="user_content">
            <div style={{ maxWidth: 476 }}>
              <InputSearch
                name="name"
                value={control.name}
                onChange={e => handleChange(e)}
                placeholder="Pesquisar por nome"
                onClick={fetchData}
              />
            </div>
            <div className="user_current_situation">
              <span>
                Situação: {handleSituationTitle(lastControl.situation)}
              </span>
              {lastControl.date && (
                <span>Última atualização: {formatDate(lastControl.date)}</span>
              )}
              <img src={assets.refresh} onClick={() => fetchData()} />
            </div>

            <TableUser
              users={users}
              loading={loading}
              loadMore={loadMore}
              fetchMore={fetchNewData}
            />
          </div>
          <div className="sidebar">
            {loadingCount ? (
              <Loading />
            ) : (
              <>
                <div>
                  <h3>Informações</h3>
                  <span>Quantidade de Vendedores</span>
                  <label>{count}</label>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
