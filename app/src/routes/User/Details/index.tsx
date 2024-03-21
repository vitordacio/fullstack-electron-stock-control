import { useNavigate, useParams } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { userService } from '../../../services/User';
import { IUser } from '../../../interfaces/user';
import { IUpdateUser } from '../../../services/User/IUserService';
import Loading from '../../../components/Loading';
import { isEmail, isUsername } from '../../../utils/handleUser';
import { formatNumberToPrice } from '../../../utils/formatPrice';

const UserDetails = () => {
  const { throwInfo, throwError } = useMessage();
  const { user_id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState<IUpdateUser>({
    user_id: '',
    name: '',
    username: '',
    email: '',
    actived: false,
  });
  const [user, setUser] = useState<IUser>();
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let fetchUser: IUser | undefined;
    if (!form.name) return throwError('Informe o nome');
    if (form.name.length < 3)
      return throwError('Nome deve ter ao menos 3 caracteres');
    if (!form.username) return throwError('Informe o nome de usuário');
    if (!isUsername(form.username))
      return throwError('Nome de usuário inválido');
    if (!form.email) return throwError('Informe o nome de usuário');
    if (!isEmail(form.email)) return throwError('E-mail inválido');

    setLoading(true);

    try {
      fetchUser = await userService.updateUser(form);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (fetchUser) {
        setForm({
          user_id: fetchUser.id_user,
          name: fetchUser.name,
          username: fetchUser.username,
          email: fetchUser.email,
          actived: fetchUser.actived,
        });
        setUser(fetchUser);
        throwInfo('Vendedor atualizado com sucesso!');
      }

      setLoading(false);
    }
  };

  const fetchData = async () => {
    let fetchUser: IUser | undefined;
    try {
      fetchUser = await userService.findById(user_id as string);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (fetchUser) {
        setForm({
          user_id: fetchUser.id_user,
          name: fetchUser.name,
          username: fetchUser.username,
          email: fetchUser.email,
          actived: fetchUser.actived,
        });
        setUser(fetchUser);
      }

      setLoadingData(false);
    }
  };

  const deleteUser = async () => {
    try {
      await userService.deleteUser(user_id as string);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      throwInfo('Vendedor excluído com sucesso!');
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
          <span>Vendedores</span>
          {user && !user.deleted_at && (
            <Button
              type="button"
              text="Deletar"
              customClass="red"
              onClick={deleteUser}
              style={{ maxWidth: 160 }}
            />
          )}
        </header>

        <div className="user_body">
          <form
            onSubmit={handleUpdateUser}
            className="form_default"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <div className="form_basics">
              <h1>Detalhes do usuário</h1>
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
                  </div>

                  <div className="form_line">
                    <div style={{ width: '100%' }}>
                      <Input
                        title="Nome de usuário*"
                        name="username"
                        value={form.username}
                        onChange={e => handleChange(e)}
                      />
                    </div>

                    <div style={{ width: '100%' }}>
                      <Input
                        title="E-mail *"
                        name="email"
                        value={form.email}
                        onChange={e => handleChange(e)}
                      />
                    </div>
                  </div>

                  <div className="form_line">
                    <span>Vendedor Ativo:</span>
                    <input
                      name="create_user_actived"
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
                    onClick={() => navigate('/user')}
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
                {user && (
                  <>
                    <div>
                      <h3>Informações</h3>
                      <span>Quantidade de Vendas</span>
                      <label>{user.sales_count}</label>
                      <span>Total em Vendas</span>
                      <label>{`R$ ${
                        user.sales_total
                          ? formatNumberToPrice(user.sales_total)
                          : '0,00'
                      }`}</label>
                    </div>

                    <Button
                      text="Mudar Senha"
                      customClass="transparent_no_hover"
                      onClick={() =>
                        navigate('/user/password', { state: user })
                      }
                    />
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

export default UserDetails;
