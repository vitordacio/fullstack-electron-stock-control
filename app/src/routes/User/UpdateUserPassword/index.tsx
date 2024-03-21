import { useLocation, useNavigate } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { userService } from '../../../services/User';
import { IUser } from '../../../interfaces/user';

const UpdateUserPassword = () => {
  const { throwInfo, throwError } = useMessage();
  const { state } = useLocation();

  const navigate = useNavigate();

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let fetchUser: IUser | undefined;
    if (!password) return throwError('Informe uma senha');
    if (password.length < 6)
      return throwError('Senha deve ter ao menos 6 caracteres');

    setLoading(true);

    try {
      fetchUser = await userService.updateUserPassword({
        user_id: state.id_user,
        new_password: password,
      });
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (fetchUser) {
        throwInfo('Senha atualizada com sucesso!');
        navigate(-1);
      }
    }
  };

  return (
    <div className="main">
      <div className="main_container">
        <header className="header">
          {state && state.role_name === 'company' && <span>Empresa</span>}
          {state && state.role_name === 'user' && <span>Usuário</span>}
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
                <div style={{ width: '100%' }}>
                  <Input
                    title="Nova Senha *"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    isSecurityEntry={true}
                    // minWidth={430}
                  />
                </div>
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

export default UpdateUserPassword;
