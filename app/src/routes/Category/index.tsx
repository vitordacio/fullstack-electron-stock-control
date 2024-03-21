import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import './index.css';
import { useEffect, useState } from 'react';
import InputSearch from '../../components/Input/Search';
import TableCategory from '../../components/Table/Category';
import { useMessage } from '../../contexts/message';
import { ICategory } from '../../interfaces/category';
import { categoryService } from '../../services/Category';
import Loading from '../../components/Loading';
import { formatDate } from '../../utils/formatDate';
import assets from '../../assets';

type CategorySearch = {
  name: string;
  page: number;
  date?: Date;
};

const Category = () => {
  const navigate = useNavigate();
  const { throwError } = useMessage();

  const [control, setControl] = useState<CategorySearch>({
    name: '',
    page: 1,
  });
  const [lastControl, setLastControl] = useState<CategorySearch>({
    name: '',
    page: 1,
  });
  const [loadMore, setLoadMore] = useState<boolean>(true);

  const [loadingCount, setLoadingCount] = useState<boolean>(true);
  const [count, setCount] = useState<number>();

  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setControl(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchNewData = async () => {
    let newCategories: ICategory[] = [];
    let newLoadMore = true;
    const newControl: CategorySearch = {
      name: lastControl.name,
      page: lastControl.page + 1,
      date: new Date(),
    };
    try {
      newCategories = await categoryService.findByCompany({
        name: newControl.name,
        page: newControl.page,
      });
      if (newCategories.length < 20) newLoadMore = false;
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (newCategories.length !== 0)
        setCategories(prev => [...prev, ...newCategories]);
      setLoadMore(newLoadMore);
      setLastControl(newControl);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    if (!loading) setLoading(true);
    let newCategories;
    let newLoadMore = true;
    const newControl: CategorySearch = {
      name: control.name,
      page: 1,
      date: new Date(),
    };
    try {
      newCategories = await categoryService.findByCompany({
        name: newControl.name,
        page: newControl.page,
      });
      if (newCategories.length < 20) newLoadMore = false;
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      if (newCategories) setCategories(newCategories);
      setLoadMore(newLoadMore);
      setLastControl(newControl);
      setLoading(false);
    }
  };

  const findCount = async () => {
    let newCount = 0;
    try {
      newCount = await categoryService.findCountByCompany();
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
          <span>Categorias</span>
          <Button
            icon="plus"
            text="Cadastrar Categoria"
            style={{ maxWidth: 210 }}
            onClick={() => navigate('/category/create')}
          />
        </header>
        <div className="category_body">
          <div className="category_content">
            <div style={{ maxWidth: 476 }}>
              <InputSearch
                name="name"
                value={control.name}
                onChange={e => handleChange(e)}
                placeholder="Pesquisar por nome"
                onClick={fetchData}
              />
            </div>
            <div className="category_current_situation">
              {lastControl.date && (
                <span>Última atualização: {formatDate(lastControl.date)}</span>
              )}
              <img src={assets.refresh} onClick={() => fetchData()} />
            </div>

            <TableCategory
              categories={categories}
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
                  <span>Quantidade de Categorias</span>
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

export default Category;
