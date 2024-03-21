import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { userService } from '../../../services/User';
import { IUser } from '../../../interfaces/user';
import useAuth from '../../../contexts/auth';

const UpdateSelfPassword = () => {
  const { throwInfo, throwError } = useMessage();
  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: '',
    new_password: '',
    confirm: '',
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

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) return;
    e.preventDefault();
    let fetchUser: IUser | undefined;

    if (form.new_password !== form.confirm)
      return throwError('As senhas não coincidem');

    if (!form.password) return throwError('Informe uma senha');
    if (form.password.length < 6)
      return throwError('Senha deve ter ao menos 6 caracteres');

    if (!form.new_password) return throwError('Informe uma senha');
    if (form.new_password.length < 6)
      return throwError('Senha deve ter ao menos 6 caracteres');

    setLoading(true);

    try {
      fetchUser = await userService.updateUserPassword({
        user_id: user.id_user,
        password: form.password,
        new_password: form.new_password,
      });
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (fetchUser) {
        setUser(fetchUser);
        throwInfo('Senha atualizada com sucesso!');
        navigate(-1);
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
        </header>

        <div className="user_body">
          <form
            onSubmit={handleUpdatePassword}
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
                <Input
                  title="Senha *"
                  name="password"
                  value={form.password}
                  onChange={e => handleChange(e)}
                  isSecurityEntry={true}
                />
              </div>
              <div className="form_line">
                <Input
                  title="Nova Senha *"
                  name="new_password"
                  value={form.new_password}
                  onChange={e => handleChange(e)}
                  isSecurityEntry={true}
                />
              </div>
              <div className="form_line">
                <Input
                  title="Confirmar Nova Senha *"
                  name="confirm"
                  value={form.confirm}
                  onChange={e => handleChange(e)}
                  isSecurityEntry={true}
                />
              </div>
            </div>

            <div className="space_between">
              <Button
                type="button"
                text="Cancelar"
                customClass="transparent"
                onClick={() => navigate(-1)}
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

export default UpdateSelfPassword;
