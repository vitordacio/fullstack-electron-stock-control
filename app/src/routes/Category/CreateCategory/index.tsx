import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { categoryService } from '../../../services/Category';

const CreateCategory = () => {
  const { throwInfo, throwError } = useMessage();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return throwError('Informe o nome da categoria');
    if (name.length < 3)
      return throwError('Nome da categoria deve ter ao menos 3 caracteres');

    setLoading(true);

    try {
      await categoryService.createCategory({
        name,
      });
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      throwInfo('Categoria criada com sucesso!');
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
          <span>Categorias</span>
        </header>
        <form onSubmit={handleCreateCategory} className="form_default">
          <div className="form_basics">
            <h1>Cadastrar nova categoria</h1>
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
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space_between">
            <Button
              type="button"
              text="Cancelar"
              customClass="transparent"
              onClick={() => navigate('/category')}
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

export default CreateCategory;
