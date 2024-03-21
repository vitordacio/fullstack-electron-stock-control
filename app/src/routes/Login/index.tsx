import useAuth from '../../contexts/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './index.css';
import { useEffect, useState } from 'react';
import { userService } from '../../services/User';
import Loading from '../../components/Loading';
import { useMessage } from '../../contexts/message';

const Login = () => {
  const { throwError } = useMessage();
  const { SignIn, loginError } = useAuth();

  const [serverMessage, setServerMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState({
    login: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.login)
      return throwError('O campo login não pode ser um texto vazio.');
    if (!form.password)
      return throwError('O campo senha não pode ser um texto vazio.');

    await SignIn({
      login: form.login,
      password: form.password,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const verifyServer = async () => {
    setLoading(true);
    let message = '';
    try {
      const response = await userService.verifyServer();
      message = response.message;
    } catch (error: any) {
      setServerMessage(message);
    } finally {
      setServerMessage(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyServer();
  }, []);

  return (
    <div className="login_container">
      <div className="login_refresh">
        <Button
          onClick={() => verifyServer()}
          icon="refresh"
          style={{ width: 35.23 }}
          customClass="transparent_no_hover"
        />
      </div>
      <div className="login_form">
        <span>Minha Conta</span>

        <label>Entrar com e-mail ou nome de usuário</label>
        <form onSubmit={handleLogin}>
          <Input
            title="Login"
            name="login"
            value={form.login}
            onChange={e => handleChange(e)}
            minWidth={430}
          />
          <Input
            title="Senha"
            name="password"
            value={form.password}
            onChange={e => handleChange(e)}
            isSecurityEntry={true}
            minWidth={430}
          />

          <div className="error_login">
            {loginError && <span>{loginError}</span>}
          </div>
          <Button type="submit" text="Entrar" marginVertical={true} />
        </form>
      </div>
      {loading ? (
        <span>
          <Loading />
        </span>
      ) : (
        <span style={{ color: serverMessage ? 'green' : 'red' }}>
          {serverMessage ? serverMessage : 'Offline'}
        </span>
      )}
    </div>
  );
};

export default Login;
