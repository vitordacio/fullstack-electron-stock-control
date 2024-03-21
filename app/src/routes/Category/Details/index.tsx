import { useNavigate, useParams } from 'react-router-dom';
import { useMessage } from '../../../contexts/message';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { categoryService } from '../../../services/Category';
import { ICategory } from '../../../interfaces/category';
import { IUpdateCategory } from '../../../services/Category/ICategoryService';
import Loading from '../../../components/Loading';

const CategoryDetails = () => {
  const { throwInfo, throwError } = useMessage();
  const { category_id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState<IUpdateCategory>({
    category_id: '',
    name: '',
  });

  const [category, setCategory] = useState<ICategory>();
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let fetchCategory: ICategory | undefined;
    if (!form.name) return throwError('Informe o nome da categoria');
    if (form.name.length < 3)
      return throwError('Nome da categoria deve ter ao menos 3 caracteres');

    setLoading(true);

    try {
      fetchCategory = await categoryService.updateCategory(form);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (fetchCategory) {
        setForm({
          category_id: fetchCategory.id_category,
          name: fetchCategory.name,
        });
        setCategory(fetchCategory);
        throwInfo('Categoria atualizada com sucesso!');
      }

      setLoading(false);
    }
  };

  const fetchData = async () => {
    let fetchCategory: ICategory | undefined;
    try {
      fetchCategory = await categoryService.findById(category_id as string);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (fetchCategory) {
        setForm({
          category_id: fetchCategory.id_category,
          name: fetchCategory.name,
        });
      }
      setCategory(fetchCategory);
      setLoadingData(false);
    }
  };

  const deleteCategory = async () => {
    try {
      await categoryService.deleteCategory(category_id as string);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      throwInfo('Categoria excluída com sucesso!');
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
          <span>Categorias</span>
          {category && !category.deleted_at && (
            <Button
              type="button"
              text="Deletar"
              customClass="red"
              onClick={deleteCategory}
              style={{ maxWidth: 160 }}
            />
          )}
        </header>

        <div className="category_body">
          <form
            onSubmit={handleUpdateCategory}
            className="form_default"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <div className="form_basics">
              <h1>Detalhes da categoria</h1>
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
                        onChange={e =>
                          setForm(prev => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
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
                {category && (
                  <>
                    <div>
                      <h3>Informações</h3>
                      <span>Número de Vendas</span>
                      <label>12</label>
                      <span>Total em Vendas</span>
                      <label>R$ 225,00</label>
                    </div>
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

export default CategoryDetails;
