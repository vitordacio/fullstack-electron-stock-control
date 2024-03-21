import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMessage } from './message';
import { ICategory } from '../interfaces/category';
import useAuth from './auth';

interface ICategoryContextData {
  loading: boolean;
  data: ICategory[];
  setData: React.Dispatch<React.SetStateAction<ICategory[]>>;
  fetchData: () => Promise<void>;
}

interface IProps {
  children: React.ReactNode;
}

const CategoryContext = createContext<ICategoryContextData>(
  {} as ICategoryContextData,
);

export const CategoryProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();

  const { throwError } = useMessage();
  const [data, setData] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      // const categories = await categoryService.findIndex();
      setData([]);
    } catch (error: any) {
      throwError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        loading,
        data,
        setData,
        fetchData,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => useContext(CategoryContext);
export default useCategory;
