import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { userService } from '../../../services/User';
import { IUser } from '../../../interfaces/user';
import { IUpdateUser } from '../../../services/User/IUserService';
import { isEmail, isUsername } from '../../../utils/handleUser';
import useAuth from '../../../contexts/auth';

const UpdateSelf = () => {
  const { throwInfo, throwError } = useMessage();
  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState<IUpdateUser>({
    user_id: user ? user.id_user : '',
    name: user ? user.name : '',
    username: user ? user.username : '',
    email: user ? user.email : '',
    actived: user ? user.actived : true,
  });

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
        throwInfo('Usuário atualizado com sucesso!');
      }

      setLoading(false);
    }
  };

  return (
    <div className="main">
      <div className="main_container">
        <header className="header">
          {user && user.role_name === 'company' && <span>Empresa</span>}
          {user && user.role_name === 'user' && <span>Usuário</span>}
          <Button
            text="Mudar Senha"
            customClass="transparent"
            onClick={() => navigate('/user/self/password', { state: user })}
            style={{ maxWidth: 160 }}
          />
        </header>

        <div className="user_body">
          <form
            onSubmit={handleUpdateUser}
            className="form_default"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <div className="form_basics">
              <h1>Detalhes da conta</h1>
              <div>
                <h3>Dados Básicos</h3>
                <span>(*) Campos obrigatórios</span>
              </div>
            </div>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSelf;
