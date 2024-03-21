import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { userService } from '../../../services/User';
import { ICreateUser } from '../../../services/User/IUserService';
import { isEmail, isUsername } from '../../../utils/handleUser';

const CreateUser = () => {
  const { throwInfo, throwError } = useMessage();
  const navigate = useNavigate();

  const [form, setForm] = useState<ICreateUser>({
    name: '',
    email: '',
    username: '',
    role_name: 'user',
    actived: true,
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

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name) return throwError('Informe o nome');
    if (form.name.length < 3)
      return throwError('Nome deve ter ao menos 3 caracteres');
    if (!form.username) return throwError('Informe o nome de usuário');
    if (!isUsername(form.username))
      return throwError('Nome de usuário inválido');
    if (!form.email) return throwError('Informe o e-mail');
    if (!isEmail(form.email)) return throwError('E-mail inválido');

    setLoading(true);

    try {
      await userService.createUser(form);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      throwInfo('Vendedor criado com sucesso!');
      navigate(-1);
    }
  };

  return (
    <div className="main">
      <div
        className="main_container"
        style={{ paddingLeft: 10, paddingRight: 10 }}
      >
        <header className="header" style={{ padding: 0 }}>
          <span>Vendedores</span>
        </header>
        <form onSubmit={handleCreateUser} className="form_default">
          <div className="form_basics">
            <h1>Cadastrar novo vendedor</h1>
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
              type="submit"
              text="Confirmar"
              loading={loading}
              style={{ maxWidth: 160 }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
